"""OpenAPI structural/semantic diff.

Validates specs with openapi-spec-validator, then diffs paths/operations/
schemas with rules inspired by oasdiff breaking-change levels
(https://www.oasdiff.com/docs/breaking-changes). Runtime stays Python-native.
"""

from __future__ import annotations

from typing import Any

from openapi_spec_validator import validate
from openapi_spec_validator.exceptions import OpenAPISpecValidatorError

from app.schemas.diff import (
    ChangeClassification,
    ChangeItem,
    ChangeKind,
    ChangeSeverity,
)
from app.services.json_diff import diff_json_responses


class OpenAPIValidationError(ValueError):
    pass


def validate_openapi(doc: Any, label: str) -> list[str]:
    warnings: list[str] = []
    if not isinstance(doc, dict):
        raise OpenAPIValidationError(f"{label} is not an object")
    try:
        validate(doc)
    except OpenAPISpecValidatorError as exc:
        # Soft-fail with warning so partial/demo specs still diff
        warnings.append(f"{label} OpenAPI validation warning: {exc}")
    except Exception as exc:  # noqa: BLE001 — surface validator quirks
        warnings.append(f"{label} OpenAPI validation issue: {exc}")
    return warnings


HTTP_METHODS = ("get", "post", "put", "patch", "delete", "head", "options", "trace")


def diff_openapi(before: dict[str, Any], after: dict[str, Any]) -> tuple[list[ChangeItem], list[str]]:
    warnings: list[str] = []
    warnings.extend(validate_openapi(before, "before"))
    warnings.extend(validate_openapi(after, "after"))

    changes: list[ChangeItem] = []
    idx = 0

    before_paths = before.get("paths") or {}
    after_paths = after.get("paths") or {}
    if not isinstance(before_paths, dict) or not isinstance(after_paths, dict):
        warnings.append("paths must be objects; falling back to generic deep diff")
        return diff_json_responses(before, after), warnings

    for path in sorted(set(before_paths) - set(after_paths)):
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"paths.{path}",
                kind=ChangeKind.PATH_REMOVED,
                classification=ChangeClassification.BREAKING,
                severity=ChangeSeverity.ERR,
                summary=f"Removed path {path}",
                before_value=before_paths.get(path),
                after_value=None,
            )
        )

    for path in sorted(set(after_paths) - set(before_paths)):
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"paths.{path}",
                kind=ChangeKind.PATH_ADDED,
                classification=ChangeClassification.NON_BREAKING,
                severity=ChangeSeverity.INFO,
                summary=f"Added path {path}",
                before_value=None,
                after_value=after_paths.get(path),
            )
        )

    for path in sorted(set(before_paths) & set(after_paths)):
        b_ops = before_paths[path] if isinstance(before_paths[path], dict) else {}
        a_ops = after_paths[path] if isinstance(after_paths[path], dict) else {}
        for method in HTTP_METHODS:
            b_has = method in b_ops
            a_has = method in a_ops
            if b_has and not a_has:
                idx += 1
                changes.append(
                    ChangeItem(
                        id=f"oas_{idx}",
                        path=f"paths.{path}.{method}",
                        kind=ChangeKind.OPERATION_REMOVED,
                        classification=ChangeClassification.BREAKING,
                        severity=ChangeSeverity.ERR,
                        summary=f"Removed operation {method.upper()} {path}",
                        before_value=b_ops.get(method),
                        after_value=None,
                    )
                )
            elif a_has and not b_has:
                idx += 1
                changes.append(
                    ChangeItem(
                        id=f"oas_{idx}",
                        path=f"paths.{path}.{method}",
                        kind=ChangeKind.OPERATION_ADDED,
                        classification=ChangeClassification.NON_BREAKING,
                        severity=ChangeSeverity.INFO,
                        summary=f"Added operation {method.upper()} {path}",
                        before_value=None,
                        after_value=a_ops.get(method),
                    )
                )
            elif b_has and a_has:
                op_changes, idx = _diff_operation(
                    path,
                    method,
                    b_ops[method],
                    a_ops[method],
                    idx,
                )
                changes.extend(op_changes)

    # Component schema property-level deep diff for shared models
    b_schemas = ((before.get("components") or {}).get("schemas")) or {}
    a_schemas = ((after.get("components") or {}).get("schemas")) or {}
    if isinstance(b_schemas, dict) and isinstance(a_schemas, dict):
        for name in sorted(set(b_schemas) & set(a_schemas)):
            schema_changes = diff_json_responses(b_schemas[name], a_schemas[name])
            for ch in schema_changes:
                idx += 1
                # Remap ids and paths into components namespace
                remapped = ch.model_copy(
                    update={
                        "id": f"oas_{idx}",
                        "path": f"components.schemas.{name}{ch.path[1:] if ch.path.startswith('$') else '.' + ch.path}",
                        "summary": f"Schema {name}: {ch.summary}",
                    }
                )
                # Required property added on request-like schemas is breaking;
                # for shared schemas treat required_added if kind is added under required
                if "required" in remapped.path and remapped.kind == ChangeKind.ADDED:
                    remapped = remapped.model_copy(
                        update={
                            "kind": ChangeKind.REQUIRED_ADDED,
                            "classification": ChangeClassification.BREAKING,
                            "severity": ChangeSeverity.ERR,
                            "summary": f"Schema {name}: required property added",
                        }
                    )
                if remapped.kind == ChangeKind.REMOVED:
                    remapped = remapped.model_copy(
                        update={
                            "classification": ChangeClassification.BREAKING,
                            "severity": ChangeSeverity.ERR,
                        }
                    )
                # Deprecation flag
                if str(remapped.after_value).lower() == "true" and "deprecated" in remapped.path:
                    remapped = remapped.model_copy(
                        update={
                            "kind": ChangeKind.DEPRECATED,
                            "classification": ChangeClassification.DEPRECATION,
                            "severity": ChangeSeverity.WARN,
                            "summary": f"Schema {name}: marked deprecated",
                        }
                    )
                changes.append(remapped)

    return changes, warnings


def _diff_operation(
    path: str,
    method: str,
    before_op: Any,
    after_op: Any,
    idx: int,
) -> tuple[list[ChangeItem], int]:
    changes: list[ChangeItem] = []
    if not isinstance(before_op, dict) or not isinstance(after_op, dict):
        return changes, idx

    # Deprecation
    if before_op.get("deprecated") is not True and after_op.get("deprecated") is True:
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"paths.{path}.{method}.deprecated",
                kind=ChangeKind.DEPRECATED,
                classification=ChangeClassification.DEPRECATION,
                severity=ChangeSeverity.WARN,
                summary=f"Deprecated operation {method.upper()} {path}",
                before_value=False,
                after_value=True,
            )
        )

    b_responses = before_op.get("responses") or {}
    a_responses = after_op.get("responses") or {}
    if isinstance(b_responses, dict) and isinstance(a_responses, dict):
        for code in sorted(set(b_responses) - set(a_responses)):
            idx += 1
            changes.append(
                ChangeItem(
                    id=f"oas_{idx}",
                    path=f"paths.{path}.{method}.responses.{code}",
                    kind=ChangeKind.RESPONSE_REMOVED,
                    classification=ChangeClassification.BREAKING,
                    severity=ChangeSeverity.ERR,
                    summary=f"Removed response {code} from {method.upper()} {path}",
                    before_value=b_responses.get(code),
                    after_value=None,
                )
            )
        for code in sorted(set(a_responses) - set(b_responses)):
            idx += 1
            changes.append(
                ChangeItem(
                    id=f"oas_{idx}",
                    path=f"paths.{path}.{method}.responses.{code}",
                    kind=ChangeKind.ADDED,
                    classification=ChangeClassification.NON_BREAKING,
                    severity=ChangeSeverity.INFO,
                    summary=f"Added response {code} to {method.upper()} {path}",
                    before_value=None,
                    after_value=a_responses.get(code),
                )
            )

    # Required request parameters added
    b_params = before_op.get("parameters") or []
    a_params = after_op.get("parameters") or []
    if isinstance(b_params, list) and isinstance(a_params, list):
        def param_key(p: Any) -> str:
            if isinstance(p, dict):
                return f"{p.get('in')}:{p.get('name')}"
            return str(p)

        b_map = {param_key(p): p for p in b_params if isinstance(p, dict)}
        a_map = {param_key(p): p for p in a_params if isinstance(p, dict)}
        for key in sorted(set(a_map) - set(b_map)):
            param = a_map[key]
            if param.get("required") is True:
                idx += 1
                changes.append(
                    ChangeItem(
                        id=f"oas_{idx}",
                        path=f"paths.{path}.{method}.parameters.{key}",
                        kind=ChangeKind.REQUIRED_ADDED,
                        classification=ChangeClassification.BREAKING,
                        severity=ChangeSeverity.ERR,
                        summary=f"Added required parameter {key} on {method.upper()} {path}",
                        before_value=None,
                        after_value=param,
                    )
                )
            else:
                idx += 1
                changes.append(
                    ChangeItem(
                        id=f"oas_{idx}",
                        path=f"paths.{path}.{method}.parameters.{key}",
                        kind=ChangeKind.ADDED,
                        classification=ChangeClassification.NON_BREAKING,
                        severity=ChangeSeverity.INFO,
                        summary=f"Added optional parameter {key} on {method.upper()} {path}",
                        before_value=None,
                        after_value=param,
                    )
                )
        for key in sorted(set(b_map) - set(a_map)):
            idx += 1
            changes.append(
                ChangeItem(
                    id=f"oas_{idx}",
                    path=f"paths.{path}.{method}.parameters.{key}",
                    kind=ChangeKind.REMOVED,
                    classification=ChangeClassification.BREAKING,
                    severity=ChangeSeverity.ERR,
                    summary=f"Removed parameter {key} from {method.upper()} {path}",
                    before_value=b_map[key],
                    after_value=None,
                )
            )

    return changes, idx

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
        warnings.append(f"{label} OpenAPI validation warning: {exc}")
    except Exception as exc:  # noqa: BLE001 - surface validator quirks
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

    b_schemas = ((before.get("components") or {}).get("schemas")) or {}
    a_schemas = ((after.get("components") or {}).get("schemas")) or {}
    if isinstance(b_schemas, dict) and isinstance(a_schemas, dict):
        for name in sorted(set(b_schemas) & set(a_schemas)):
            schema_changes, idx = _diff_schema(
                name,
                b_schemas[name],
                a_schemas[name],
                idx,
            )
            changes.extend(schema_changes)

    return changes, warnings


def _diff_schema(
    name: str,
    before: Any,
    after: Any,
    idx: int,
) -> tuple[list[ChangeItem], int]:
    changes: list[ChangeItem] = []
    if not isinstance(before, dict) or not isinstance(after, dict):
        return changes, idx

    base = f"components.schemas.{name}"

    # Deprecated flag on schema
    if before.get("deprecated") is not True and after.get("deprecated") is True:
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"{base}.deprecated",
                kind=ChangeKind.DEPRECATED,
                classification=ChangeClassification.DEPRECATION,
                severity=ChangeSeverity.WARN,
                summary=f"Schema {name}: marked deprecated",
                before_value=False,
                after_value=True,
            )
        )

    b_required = set(before.get("required") or []) if isinstance(before.get("required"), list) else set()
    a_required = set(after.get("required") or []) if isinstance(after.get("required"), list) else set()
    for prop in sorted(a_required - b_required):
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"{base}.required.{prop}",
                kind=ChangeKind.REQUIRED_ADDED,
                classification=ChangeClassification.BREAKING,
                severity=ChangeSeverity.ERR,
                summary=f"Schema {name}: required property added ({prop})",
                before_value=None,
                after_value=prop,
            )
        )
    for prop in sorted(b_required - a_required):
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"{base}.required.{prop}",
                kind=ChangeKind.REQUIRED_REMOVED,
                classification=ChangeClassification.NON_BREAKING,
                severity=ChangeSeverity.INFO,
                summary=f"Schema {name}: required property removed ({prop})",
                before_value=prop,
                after_value=None,
            )
        )

    b_props = before.get("properties") if isinstance(before.get("properties"), dict) else {}
    a_props = after.get("properties") if isinstance(after.get("properties"), dict) else {}

    for prop in sorted(set(a_props) - set(b_props)):
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"{base}.properties.{prop}",
                kind=ChangeKind.ADDED,
                classification=ChangeClassification.NON_BREAKING,
                severity=ChangeSeverity.INFO,
                summary=f"Schema {name}: added property {prop}",
                before_value=None,
                after_value=a_props[prop],
            )
        )

    for prop in sorted(set(b_props) - set(a_props)):
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"{base}.properties.{prop}",
                kind=ChangeKind.REMOVED,
                classification=ChangeClassification.BREAKING,
                severity=ChangeSeverity.ERR,
                summary=f"Schema {name}: removed property {prop}",
                before_value=b_props[prop],
                after_value=None,
            )
        )

    for prop in sorted(set(b_props) & set(a_props)):
        prop_changes, idx = _diff_property_schema(
            f"{base}.properties.{prop}",
            name,
            prop,
            b_props[prop],
            a_props[prop],
            idx,
        )
        changes.extend(prop_changes)

    return changes, idx


def _diff_property_schema(
    path: str,
    schema_name: str,
    prop: str,
    before: Any,
    after: Any,
    idx: int,
) -> tuple[list[ChangeItem], int]:
    changes: list[ChangeItem] = []
    if not isinstance(before, dict) or not isinstance(after, dict):
        return changes, idx

    b_type = before.get("type")
    a_type = after.get("type")
    if b_type != a_type and b_type is not None and a_type is not None:
        compatible = b_type == "integer" and a_type == "number"
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"{path}.type",
                kind=ChangeKind.TYPE_CHANGED,
                classification=(
                    ChangeClassification.NON_BREAKING
                    if compatible
                    else ChangeClassification.BREAKING
                ),
                severity=ChangeSeverity.INFO if compatible else ChangeSeverity.ERR,
                summary=f"Schema {schema_name}.{prop}: type {b_type} → {a_type}",
                before_value=b_type,
                after_value=a_type,
                mapping={"compatible": compatible, "before_type": b_type, "after_type": a_type},
                intent="type_migration",
            )
        )

    # nullable (OpenAPI 3.0)
    b_null = bool(before.get("nullable"))
    a_null = bool(after.get("nullable"))
    if b_null and not a_null:
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"{path}.nullable",
                kind=ChangeKind.NULLABILITY_REMOVED,
                classification=ChangeClassification.BREAKING,
                severity=ChangeSeverity.ERR,
                summary=f"Schema {schema_name}.{prop}: nullability removed",
                before_value=True,
                after_value=False,
            )
        )
    elif not b_null and a_null:
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"{path}.nullable",
                kind=ChangeKind.NULLABILITY_ADDED,
                classification=ChangeClassification.NON_BREAKING,
                severity=ChangeSeverity.INFO,
                summary=f"Schema {schema_name}.{prop}: became nullable",
                before_value=False,
                after_value=True,
            )
        )

    if before.get("deprecated") is not True and after.get("deprecated") is True:
        idx += 1
        changes.append(
            ChangeItem(
                id=f"oas_{idx}",
                path=f"{path}.deprecated",
                kind=ChangeKind.DEPRECATED,
                classification=ChangeClassification.DEPRECATION,
                severity=ChangeSeverity.WARN,
                summary=f"Schema {schema_name}.{prop}: marked deprecated",
                before_value=False,
                after_value=True,
            )
        )

    b_enum = before.get("enum") if isinstance(before.get("enum"), list) else None
    a_enum = after.get("enum") if isinstance(after.get("enum"), list) else None
    if b_enum is not None and a_enum is not None:
        b_set, a_set = set(b_enum), set(a_enum)
        removed_vals = b_set - a_set
        added_vals = a_set - b_set
        if removed_vals and not added_vals:
            idx += 1
            changes.append(
                ChangeItem(
                    id=f"oas_{idx}",
                    path=f"{path}.enum",
                    kind=ChangeKind.ENUM_NARROWED,
                    classification=ChangeClassification.BREAKING,
                    severity=ChangeSeverity.ERR,
                    summary=f"Schema {schema_name}.{prop}: enum narrowed (removed {sorted(removed_vals)!r})",
                    before_value=b_enum,
                    after_value=a_enum,
                    mapping={"removed": sorted(removed_vals, key=str)},
                    intent="enum_narrow",
                )
            )
        elif added_vals and not removed_vals:
            idx += 1
            changes.append(
                ChangeItem(
                    id=f"oas_{idx}",
                    path=f"{path}.enum",
                    kind=ChangeKind.ENUM_WIDENED,
                    classification=ChangeClassification.NON_BREAKING,
                    severity=ChangeSeverity.INFO,
                    summary=f"Schema {schema_name}.{prop}: enum widened (added {sorted(added_vals)!r})",
                    before_value=b_enum,
                    after_value=a_enum,
                    mapping={"added": sorted(added_vals, key=str)},
                    intent="enum_widen",
                )
            )
        elif removed_vals and added_vals:
            idx += 1
            # Best-effort pairwise map by order / similarity left to correlate;
            # emit enum_mapped structural hint
            mapping = {str(k): str(v) for k, v in zip(sorted(removed_vals, key=str), sorted(added_vals, key=str))}
            changes.append(
                ChangeItem(
                    id=f"oas_{idx}",
                    path=f"{path}.enum",
                    kind=ChangeKind.ENUM_MAPPED,
                    classification=ChangeClassification.BREAKING,
                    severity=ChangeSeverity.ERR,
                    summary=f"Schema {schema_name}.{prop}: enum values remapped",
                    before_value=b_enum,
                    after_value=a_enum,
                    mapping=mapping,
                    intent="enum_remap",
                    confidence=75.0,
                )
            )

    # Constraint tightening (minLength / maximum etc.)
    for key, tighter in (
        ("minLength", True),
        ("minItems", True),
        ("minimum", True),
        ("maxLength", False),
        ("maxItems", False),
        ("maximum", False),
    ):
        if key in before and key in after and before[key] != after[key]:
            try:
                b_n, a_n = float(before[key]), float(after[key])
            except (TypeError, ValueError):
                continue
            is_tighter = (a_n > b_n) if tighter else (a_n < b_n)
            if is_tighter:
                idx += 1
                changes.append(
                    ChangeItem(
                        id=f"oas_{idx}",
                        path=f"{path}.{key}",
                        kind=ChangeKind.CONSTRAINT_TIGHTENED,
                        classification=ChangeClassification.BREAKING,
                        severity=ChangeSeverity.ERR,
                        summary=f"Schema {schema_name}.{prop}: {key} tightened ({before[key]} → {after[key]})",
                        before_value=before[key],
                        after_value=after[key],
                    )
                )

    return changes, idx


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

"""Diff orchestration pipeline."""

from __future__ import annotations

from app.schemas.diff import (
    ChangeClassification,
    DiffRequest,
    DiffResult,
    DiffSummary,
    InputKind,
)
from app.services.guide import build_migration_guide
from app.services.json_diff import diff_json_responses
from app.services.migrations import generate_snippets
from app.services.openapi_diff import OpenAPIValidationError, diff_openapi
from app.services.parse import ParseError, detect_input_kind, parse_document


def run_diff(request: DiffRequest) -> DiffResult:
    try:
        before_doc = parse_document(request.before)
        after_doc = parse_document(request.after)
    except ParseError as exc:
        raise ValueError(str(exc)) from exc

    kind = request.input_kind
    if kind == InputKind.AUTO:
        kind = detect_input_kind(before_doc, after_doc)

    warnings: list[str] = []
    if kind == InputKind.OPENAPI:
        if not isinstance(before_doc, dict) or not isinstance(after_doc, dict):
            raise OpenAPIValidationError("OpenAPI inputs must be objects")
        changes, warnings = diff_openapi(before_doc, after_doc)
    else:
        changes = diff_json_responses(before_doc, after_doc)
        warnings.append(
            "JSON response mode infers contract shape from samples; "
            "treat classifications as guidance and confirm against your real schema."
        )

    snippets = generate_snippets(changes, request.languages)
    summary = DiffSummary(
        total=len(changes),
        breaking=sum(1 for c in changes if c.classification == ChangeClassification.BREAKING),
        non_breaking=sum(
            1 for c in changes if c.classification == ChangeClassification.NON_BREAKING
        ),
        deprecation=sum(
            1 for c in changes if c.classification == ChangeClassification.DEPRECATION
        ),
    )
    return DiffResult(
        input_kind=kind,
        changes=changes,
        summary=summary,
        snippets=snippets,
        warnings=warnings,
    )


def run_migration_guide(result: DiffResult, title: str) -> str:
    return build_migration_guide(result, title=title)

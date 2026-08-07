"""Additional classifier edge cases."""

from __future__ import annotations

from app.schemas.diff import ChangeClassification, ChangeKind, DiffRequest, InputKind
from app.services.pipeline import run_diff


def test_additive_field_is_non_breaking() -> None:
    result = run_diff(
        DiffRequest(
            before='{"a": 1}',
            after='{"a": 1, "b": 2}',
            input_kind=InputKind.JSON_RESPONSE,
        )
    )
    added = [c for c in result.changes if c.kind == ChangeKind.ADDED]
    assert added
    assert all(c.classification == ChangeClassification.NON_BREAKING for c in added)


def test_field_removal_is_breaking() -> None:
    result = run_diff(
        DiffRequest(
            before='{"email": "a@b.c"}',
            after="{}",
            input_kind=InputKind.JSON_RESPONSE,
        )
    )
    removed = [c for c in result.changes if c.kind == ChangeKind.REMOVED]
    assert removed
    assert all(c.classification == ChangeClassification.BREAKING for c in removed)


def test_incompatible_type_change_is_breaking() -> None:
    result = run_diff(
        DiffRequest(
            before='{"id": 1}',
            after='{"id": "1"}',
            input_kind=InputKind.JSON_RESPONSE,
        )
    )
    typed = [c for c in result.changes if c.kind == ChangeKind.TYPE_CHANGED]
    assert typed
    assert any(c.classification == ChangeClassification.BREAKING for c in typed)
    assert typed[0].mapping is not None
    assert result.executive is not None


def test_openapi_schema_type_change_is_breaking() -> None:
    before = """
openapi: 3.0.3
info: {title: T, version: "1"}
paths: {}
components:
  schemas:
    User:
      type: object
      properties:
        id: {type: integer}
"""
    after = """
openapi: 3.0.3
info: {title: T, version: "1"}
paths: {}
components:
  schemas:
    User:
      type: object
      properties:
        id: {type: string}
"""
    result = run_diff(DiffRequest(before=before, after=after, input_kind=InputKind.OPENAPI))
    typed = [c for c in result.changes if c.kind == ChangeKind.TYPE_CHANGED]
    assert typed
    assert all(c.classification == ChangeClassification.BREAKING for c in typed)

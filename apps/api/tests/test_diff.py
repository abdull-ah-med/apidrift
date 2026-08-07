"""Classifier and pipeline tests."""

from __future__ import annotations

import json
from pathlib import Path

from fastapi.testclient import TestClient

from app.main import app
from app.schemas.diff import ChangeClassification, ChangeKind, DiffRequest, InputKind
from app.services.pipeline import run_diff

ROOT = Path(__file__).resolve().parents[3]
EXAMPLES = ROOT / "examples"

client = TestClient(app)


def test_health() -> None:
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"


def test_json_response_diff_classifies_semantic_changes() -> None:
    before = (EXAMPLES / "json/before.json").read_text()
    after = (EXAMPLES / "json/after.json").read_text()
    result = run_diff(
        DiffRequest(before=before, after=after, input_kind=InputKind.JSON_RESPONSE)
    )
    assert result.summary.total > 0
    assert result.executive is not None
    assert any(c.classification == ChangeClassification.BREAKING for c in result.changes)
    kinds = {c.kind for c in result.changes}
    assert kinds & {
        ChangeKind.RENAMED,
        ChangeKind.RELOCATED,
        ChangeKind.SEMANTIC_TRANSFORM,
        ChangeKind.ENUM_MAPPED,
    }
    assert result.snippets
    joined = "\n".join(s.code for s in result.snippets)
    assert "String(" in joined or "str(" in joined or "userId" in joined


def test_openapi_diff_detects_path_deprecation_and_schema_type() -> None:
    before = (EXAMPLES / "openapi/before.yaml").read_text()
    after = (EXAMPLES / "openapi/after.yaml").read_text()
    result = run_diff(DiffRequest(before=before, after=after, input_kind=InputKind.OPENAPI))
    assert any(c.kind == ChangeKind.PATH_REMOVED for c in result.changes) or any(
        "/users/{id}" in c.path for c in result.changes
    )
    assert any(c.classification == ChangeClassification.DEPRECATION for c in result.changes)
    assert any(c.kind == ChangeKind.PATH_ADDED for c in result.changes)
    typed = [
        c
        for c in result.changes
        if c.kind == ChangeKind.TYPE_CHANGED and c.path.endswith(".type")
    ]
    assert typed
    assert any(c.classification == ChangeClassification.BREAKING for c in typed)
    assert any(c.kind == ChangeKind.ENUM_WIDENED for c in result.changes)
    # name → fullName and/or cost → price correlation
    assert any(
        c.kind in {ChangeKind.RENAMED, ChangeKind.SEMANTIC_TRANSFORM}
        for c in result.changes
    )


def test_diff_endpoint() -> None:
    before = json.dumps({"a": 1})
    after = json.dumps({"a": "1", "b": 2})
    res = client.post(
        "/v1/diff",
        json={"before": before, "after": after, "input_kind": "json_response"},
    )
    assert res.status_code == 200
    body = res.json()
    assert body["summary"]["total"] >= 1
    assert body["executive"] is not None


def test_migration_guide_endpoint() -> None:
    before = json.dumps({"email": "x"})
    after = json.dumps({})
    diff = client.post(
        "/v1/diff",
        json={"before": before, "after": after, "input_kind": "json_response"},
    ).json()
    res = client.post("/v1/migration-guide", json={"result": diff, "title": "Test Guide"})
    assert res.status_code == 200
    md = res.json()["markdown"]
    assert "# Test Guide" in md
    assert "Overall Risk" in md

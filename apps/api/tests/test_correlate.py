"""Semantic correlation and migration generator tests."""

from __future__ import annotations

import json

from app.schemas.diff import ChangeClassification, ChangeKind, DiffRequest, InputKind
from app.services.correlate import correlate_changes, normalize_key, synonym_score
from app.services.json_diff import diff_json_responses
from app.services.migrations import generate_snippets
from app.services.pipeline import run_diff
from app.schemas.diff import DiffLanguage


def test_normalize_kebab_and_snake() -> None:
    assert normalize_key("user_id") == normalize_key("userId")
    assert normalize_key("first-name") == normalize_key("firstName")
    assert synonym_score("created", "createdAt") >= 0.85
    assert synonym_score("id", "accountId") >= 0.85


def test_rename_id_to_userid() -> None:
    before = {"id": 1}
    after = {"userId": 1}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    renamed = [c for c in correlated if c.kind == ChangeKind.RENAMED]
    assert renamed
    assert renamed[0].from_path == "$.id"
    assert renamed[0].path == "$.userId"
    assert renamed[0].confidence is not None and renamed[0].confidence >= 90
    assert renamed[0].reasons


def test_rename_with_type_migration() -> None:
    before = {"id": 123}
    after = {"userId": "123"}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    found = [
        c
        for c in correlated
        if c.kind in {ChangeKind.RENAMED, ChangeKind.SEMANTIC_TRANSFORM}
    ]
    assert found
    assert found[0].from_path == "$.id"
    assert found[0].path == "$.userId"
    assert found[0].confidence is not None and found[0].confidence >= 90
    assert any("Type migration" in r or "type" in r.lower() for r in found[0].reasons)


def test_boolean_to_status() -> None:
    before = {"isActive": True}
    after = {"status": "ACTIVE"}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    transforms = [c for c in correlated if c.intent == "boolean_to_enum"]
    assert transforms
    assert transforms[0].confidence is not None and transforms[0].confidence >= 90


def test_enum_user_to_member() -> None:
    before = {"role": "user"}
    after = {"role": "member"}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    mapped = [c for c in correlated if c.kind == ChangeKind.ENUM_MAPPED]
    assert mapped
    assert mapped[0].reasons


def test_single_field_relocation() -> None:
    before = {"amount": 99.99}
    after = {"price": {"amount": 99.99}}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    relocated = [c for c in correlated if c.kind == ChangeKind.RELOCATED]
    assert len(relocated) == 1
    assert relocated[0].from_path == "$.amount"
    assert relocated[0].path == "$.price.amount"
    assert relocated[0].confidence is not None and relocated[0].confidence >= 95


def test_multiple_relocations_into_price_object() -> None:
    before = {"amount": 99.99, "currency": "USD"}
    after = {"price": {"amount": 99.99, "currency": "USD"}}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    relocated = [c for c in correlated if c.kind == ChangeKind.RELOCATED]
    paths = {(c.from_path, c.path) for c in relocated}
    assert ("$.amount", "$.price.amount") in paths
    assert ("$.currency", "$.price.currency") in paths
    assert not any(c.kind == ChangeKind.REMOVED for c in correlated)
    assert not any(c.kind == ChangeKind.ADDED and c.path == "$.price" for c in correlated)
    assert all(c.confidence is not None and c.confidence >= 95 for c in relocated)


def test_safe_addition_is_non_breaking() -> None:
    result = run_diff(
        DiffRequest(
            before='{"name": "Laptop"}',
            after='{"name": "Laptop", "description": "MacBook"}',
            input_kind=InputKind.JSON_RESPONSE,
        )
    )
    added = [c for c in result.changes if c.kind == ChangeKind.ADDED]
    assert added
    assert all(c.classification == ChangeClassification.NON_BREAKING for c in added)
    assert result.executive is not None
    assert result.executive.safe_additions >= 1


def test_migration_builds_new_nested_shape() -> None:
    before = {
        "id": 123,
        "name": "John",
        "isActive": True,
        "amount": 50,
        "currency": "USD",
    }
    after = {
        "userId": "123",
        "fullName": "John",
        "status": "ACTIVE",
        "price": {"amount": 50, "currency": "USD"},
    }
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    snippets = generate_snippets(
        correlated,
        [DiffLanguage.TYPESCRIPT, DiffLanguage.PYTHON],
        before=before,
        after=after,
    )
    ts = next(s.code for s in snippets if s.language == DiffLanguage.TYPESCRIPT)
    py = next(s.code for s in snippets if s.language == DiffLanguage.PYTHON)

    assert "userId:" in ts or "userId :" in ts
    assert "String(old" in ts
    assert "price:" in ts
    assert "amount:" in ts
    assert "currency:" in ts
    assert "old['amount']" in py or 'old["amount"]' in py or "old['amount']" in py
    assert "price" in py
    assert "return {" in ts
    assert "price: {" in ts.replace("\n", " ").replace("  ", " ") or ts.index("price:") < ts.index(
        "currency:"
    )

def test_pipeline_executive_semantic_counts() -> None:
    result = run_diff(
        DiffRequest(
            before=json.dumps(
                {
                    "id": 1,
                    "name": "Ada",
                    "isActive": True,
                    "amount": 10,
                    "currency": "USD",
                    "role": "user",
                }
            ),
            after=json.dumps(
                {
                    "userId": "1",
                    "fullName": "Ada",
                    "status": "ACTIVE",
                    "price": {"amount": 10, "currency": "USD"},
                    "role": "member",
                    "locale": "en",
                }
            ),
            input_kind=InputKind.JSON_RESPONSE,
        )
    )
    assert result.executive is not None
    assert result.executive.field_relocations >= 2
    assert result.executive.likely_renames >= 1
    assert result.executive.boolean_transformations >= 1
    assert result.executive.safe_additions >= 1
    assert result.executive.enum_migrations >= 1
    assert result.executive.object_restructures >= 1


def test_boolean_is_paid_to_payment_status() -> None:
    before = {"isPaid": True}
    after = {"paymentStatus": "PAID"}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    transforms = [c for c in correlated if c.intent == "boolean_to_enum"]
    assert len(transforms) == 1
    assert transforms[0].from_path == "$.isPaid"
    assert transforms[0].path == "$.paymentStatus"
    assert transforms[0].confidence is not None and transforms[0].confidence >= 90
    assert transforms[0].mapping is not None
    assert transforms[0].mapping.get("true") == "PAID"
    assert transforms[0].mapping.get("false") == "UNPAID"


def test_nested_rename_customer_name_to_full_name() -> None:
    before = {"customerName": "John Smith", "email": "john@example.com"}
    after = {"customer": {"fullName": "John Smith", "email": "john@example.com"}}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    pairs = {(c.from_path, c.path): c for c in correlated if c.from_path}
    assert ("$.customerName", "$.customer.fullName") in pairs
    assert ("$.email", "$.customer.email") in pairs
    name_change = pairs[("$.customerName", "$.customer.fullName")]
    assert name_change.confidence is not None and name_change.confidence >= 90
    assert name_change.kind == ChangeKind.RELOCATED


def test_object_rename_shipping_to_delivery() -> None:
    before = {"shippingAddress": {"city": "New York", "country": "USA"}}
    after = {"deliveryAddress": {"city": "New York", "country": "USA"}}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    renamed = [c for c in correlated if c.kind == ChangeKind.RENAMED]
    assert renamed
    assert renamed[0].from_path == "$.shippingAddress"
    assert renamed[0].path == "$.deliveryAddress"
    assert renamed[0].confidence is not None and renamed[0].confidence >= 90


def test_array_item_renames() -> None:
    before = {"items": [{"id": 101, "name": "Keyboard", "quantity": 1}]}
    after = {"items": [{"productId": "101", "title": "Keyboard", "quantity": 1}]}
    raw = diff_json_responses(before, after)
    correlated = correlate_changes(raw, before, after, threshold=80.0)
    pairs = {(c.from_path, c.path) for c in correlated if c.from_path}
    assert ("$.items[0].id", "$.items[0].productId") in pairs
    assert ("$.items[0].name", "$.items[0].title") in pairs


def test_complete_migration_adapter_transforms_payload() -> None:
    before = {
        "orderId": 42,
        "customerName": "John Smith",
        "email": "john@example.com",
        "isPaid": True,
        "created": "2024-01-01",
        "shippingAddress": {"city": "New York", "country": "USA"},
        "items": [{"id": 101, "name": "Keyboard", "quantity": 2}],
        "note": "rush",
    }
    after = {
        "orderId": "42",
        "customer": {"fullName": "John Smith", "email": "john@example.com"},
        "paymentStatus": "PAID",
        "createdAt": "2024-01-01",
        "deliveryAddress": {"city": "New York", "country": "USA"},
        "items": [{"productId": "101", "title": "Keyboard", "quantity": 2}],
        "note": "rush",
    }
    result = run_diff(
        DiffRequest(
            before=json.dumps(before),
            after=json.dumps(after),
            input_kind=InputKind.JSON_RESPONSE,
            languages=[DiffLanguage.TYPESCRIPT, DiffLanguage.PYTHON],
        )
    )
    ts = next(s.code for s in result.snippets if s.language == DiffLanguage.TYPESCRIPT)
    py = next(s.code for s in result.snippets if s.language == DiffLanguage.PYTHON)

    assert ".map((item)" in ts
    assert "productId:" in ts
    assert "title:" in ts
    assert "paymentStatus:" in ts
    assert "deliveryAddress:" in ts
    assert "customer:" in ts
    assert "note:" in ts
    assert "items: {" not in ts.replace(" ", "")
    assert "for item in" in py
    assert "productId" in py

    # Semantic detections present
    kinds = {c.kind for c in result.changes}
    assert ChangeKind.RELOCATED in kinds or ChangeKind.RENAMED in kinds
    assert any(c.intent == "boolean_to_enum" for c in result.changes)

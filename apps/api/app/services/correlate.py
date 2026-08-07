"""Semantic correlation: merge related structural ops into higher-level intents."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

from app.schemas.diff import (
    ChangeClassification,
    ChangeItem,
    ChangeKind,
    ChangeSeverity,
)

_HINT_FLOOR = 60.0

# Synonym groups (normalized keys). Used as confidence signals, not absolute rules.
_SYNONYMS: dict[str, set[str]] = {
    "id": {"id", "userid", "user_id", "accountid", "account_id", "identifier", "productid", "product_id"},
    "name": {
        "name",
        "fullname",
        "full_name",
        "displayname",
        "display_name",
        "firstname",
        "first_name",
        "customername",
        "customer_name",
        "title",
        "productname",
        "product_name",
    },
    "title": {"title", "name", "fullname", "productname", "product_name"},
    "cost": {"cost", "price", "amount"},
    "price": {"cost", "price", "amount"},
    "amount": {"cost", "price", "amount"},
    "enabled": {"enabled", "active", "isactive", "is_active"},
    "active": {"enabled", "active", "isactive", "is_active", "status"},
    "created": {"created", "createdat", "created_at", "creationdate"},
    "updated": {"updated", "updatedat", "updated_at", "modificationdate"},
    "email": {"email", "emailaddress", "email_address", "mail"},
    "status": {"status", "state", "isactive", "enabled", "active", "paymentstatus", "verificationstatus"},
    "address": {
        "address",
        "shippingaddress",
        "shipping_address",
        "deliveryaddress",
        "delivery_address",
        "billingaddress",
        "billing_address",
    },
    "paid": {"paid", "ispaid", "is_paid", "paymentstatus", "payment_status"},
    "verified": {"verified", "isverified", "is_verified", "verificationstatus", "verification_status"},
}

# Deterministic boolean → enum conventions: (from_norm, to_norm_contains, true_token, false_token)
_BOOL_ENUM_CONVENTIONS: list[tuple[str, str, str, str]] = [
    ("isactive", "status", "ACTIVE", "INACTIVE"),
    ("active", "status", "ACTIVE", "INACTIVE"),
    ("ispaid", "payment", "PAID", "UNPAID"),
    ("ispaid", "status", "PAID", "UNPAID"),
    ("paid", "payment", "PAID", "UNPAID"),
    ("isverified", "verif", "VERIFIED", "UNVERIFIED"),
    ("isverified", "status", "VERIFIED", "UNVERIFIED"),
    ("enabled", "status", "ENABLED", "DISABLED"),
]


def normalize_key(key: str) -> str:
    """Lowercase and strip separators (camelCase / snake_case / kebab-case)."""
    s = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", key)
    s = s.replace("-", "_").lower()
    return re.sub(r"[^a-z0-9]", "", s)


def leaf_key(path: str) -> str:
    token = path
    if token.startswith("$."):
        token = token[2:]
    elif token.startswith("$"):
        token = token[1:]
    if "properties." in token:
        token = token.rsplit(".", 1)[-1]
    elif "." in token:
        token = token.rsplit(".", 1)[-1]
    token = re.sub(r"\[\d+\]", "", token)
    return token


def parent_path(path: str) -> str:
    leaf = leaf_key(path)
    if path.endswith(leaf):
        parent = path[: -len(leaf)].rstrip(".")
        return parent or "$"
    if "." in path:
        return path.rsplit(".", 1)[0]
    return "$"


def path_depth(path: str) -> int:
    p = path[2:] if path.startswith("$.") else path.lstrip("$")
    if not p:
        return 0
    return len([x for x in p.replace("[", ".").replace("]", "").split(".") if x])


def levenshtein(a: str, b: str) -> int:
    if a == b:
        return 0
    if not a:
        return len(b)
    if not b:
        return len(a)
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        curr = [i]
        for j, cb in enumerate(b, 1):
            curr.append(
                min(
                    curr[j - 1] + 1,
                    prev[j] + 1,
                    prev[j - 1] + (0 if ca == cb else 1),
                )
            )
        prev = curr
    return prev[-1]


def string_similarity(a: str, b: str) -> float:
    if not a and not b:
        return 1.0
    dist = levenshtein(a, b)
    return 1.0 - dist / max(len(a), len(b), 1)


def synonym_score(a: str, b: str) -> float:
    na, nb = normalize_key(a), normalize_key(b)
    if na == nb:
        return 1.0
    for group in _SYNONYMS.values():
        if na in group and nb in group:
            return 0.95
    if na and nb and (na in nb or nb in na):
        return 0.85
    if _stem_overlap(na, nb):
        return 0.8
    return string_similarity(na, nb)


def _stem_overlap(na: str, nb: str) -> bool:
    stems = ("name", "status", "address", "id", "email", "date", "amount", "price", "paid", "active")
    for stem in stems:
        if stem in na and stem in nb:
            return True
    for prefix in ("is", "has"):
        if na.startswith(prefix) and len(na) > len(prefix):
            core = na[len(prefix) :]
            if core and core in nb:
                return True
        if nb.startswith(prefix) and len(nb) > len(prefix):
            core = nb[len(prefix) :]
            if core and core in na:
                return True
    return False


def _object_similarity(a: Any, b: Any) -> float:
    if not isinstance(a, dict) or not isinstance(b, dict):
        return 1.0 if a == b else 0.0
    if not a and not b:
        return 1.0
    keys_a, keys_b = set(a), set(b)
    key_jaccard = len(keys_a & keys_b) / max(len(keys_a | keys_b), 1)
    shared = keys_a & keys_b
    if not shared:
        return key_jaccard * 0.5
    value_hits = 0.0
    for k in shared:
        if a[k] == b[k]:
            value_hits += 1.0
        elif isinstance(a[k], dict) and isinstance(b[k], dict):
            value_hits += _object_similarity(a[k], b[k])
        elif _values_compatible(a[k], b[k]):
            value_hits += 0.7
    return 0.45 * key_jaccard + 0.55 * (value_hits / len(shared))


def _is_identifier_pattern(a: str, b: str) -> bool:
    na, nb = normalize_key(a), normalize_key(b)
    if na == "id" and nb.endswith("id"):
        return True
    if nb == "id" and na.endswith("id"):
        return True
    return False


def _is_timestamp_pattern(a: str, b: str) -> bool:
    na, nb = normalize_key(a), normalize_key(b)
    bases = {"created", "updated", "modified", "deleted"}
    for base in bases:
        if {na, nb} <= {base, f"{base}at"} or (na == base and nb == f"{base}at"):
            return True
        if na.startswith(base) and nb.startswith(base):
            return True
    return False


def _infer_type(value: Any) -> str:
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "boolean"
    if isinstance(value, int) and not isinstance(value, bool):
        return "integer"
    if isinstance(value, float):
        return "number"
    if isinstance(value, str):
        return "string"
    if isinstance(value, list):
        return "array"
    if isinstance(value, dict):
        return "object"
    return type(value).__name__


def _values_equal(before: Any, after: Any) -> bool:
    if before is None or after is None:
        return False
    return before == after


def _values_compatible(before: Any, after: Any) -> bool:
    if _values_equal(before, after):
        return True
    if isinstance(before, (int, float)) and not isinstance(before, bool) and isinstance(after, str):
        try:
            return str(before) == after or float(after) == float(before)
        except ValueError:
            return False
    if isinstance(after, (int, float)) and not isinstance(after, bool) and isinstance(before, str):
        try:
            return str(after) == before or float(before) == float(after)
        except ValueError:
            return False
    return False


def _boolean_enum_mapping(
    before_val: Any,
    after_val: Any,
    from_leaf: str = "",
    to_leaf: str = "",
) -> dict[str, Any] | None:
    if not isinstance(before_val, bool) or not isinstance(after_val, str):
        return None
    upper = after_val.upper()
    from_n, to_n = normalize_key(from_leaf), normalize_key(to_leaf)

    for from_key, to_frag, true_tok, false_tok in _BOOL_ENUM_CONVENTIONS:
        if from_n == from_key or from_key in from_n:
            if to_frag in to_n or to_n.endswith("status") or to_n.endswith("state"):
                if upper in {true_tok, false_tok}:
                    return {
                        "true": true_tok,
                        "false": false_tok,
                        "kind": "boolean_to_enum",
                        "convention": f"{from_leaf} → {to_leaf}",
                    }
                return {
                    "true": upper if before_val else true_tok,
                    "false": false_tok if before_val else upper,
                    "kind": "boolean_to_enum",
                    "convention": f"{from_leaf} → {to_leaf}",
                }

    pairs = {
        "ACTIVE": "INACTIVE",
        "ENABLED": "DISABLED",
        "TRUE": "FALSE",
        "YES": "NO",
        "ON": "OFF",
        "PAID": "UNPAID",
        "VERIFIED": "UNVERIFIED",
        "COMPLETE": "INCOMPLETE",
        "SUCCESS": "FAILURE",
    }
    if upper in pairs:
        inactive = pairs[upper]
        return {
            "true": after_val if before_val else inactive,
            "false": inactive if before_val else after_val,
            "kind": "boolean_to_enum",
        }
    if upper in pairs.values():
        true_tok = next(k for k, v in pairs.items() if v == upper)
        return {"true": true_tok, "false": after_val, "kind": "boolean_to_enum"}

    if from_n.startswith("is") and ("status" in to_n or to_n.endswith("state")) and after_val.isupper():
        false_guess = f"UN{upper}" if not upper.startswith("UN") else upper[2:]
        return {
            "true": after_val if before_val else upper,
            "false": false_guess if before_val else after_val,
            "kind": "boolean_to_enum",
        }
    return None


@dataclass
class _PairCandidate:
    removed: ChangeItem
    added: ChangeItem  # destination (may be synthetic leaf under an added object)
    source_added_id: str  # original structural ADDED id
    score: float
    kind: ChangeKind
    intent: str
    mapping: dict[str, Any]
    summary: str
    reasons: list[str] = field(default_factory=list)


def _flatten_added_leaves(added: ChangeItem) -> list[ChangeItem]:
    """Expand an added value into leaf destinations (including the root add)."""
    out: list[ChangeItem] = [added]
    val = added.after_value
    if not isinstance(val, dict):
        return out

    def walk(obj: dict[str, Any], base: str) -> None:
        for key, child in obj.items():
            child_path = f"{base}.{key}" if base != "$" else f"$.{key}"
            synthetic = added.model_copy(
                update={
                    "path": child_path,
                    "after_value": child,
                    "summary": f"Added field at {child_path}",
                }
            )
            out.append(synthetic)
            if isinstance(child, dict):
                walk(child, child_path)

    root = added.path if added.path.startswith("$") else f"$.{added.path}"
    walk(val, root)
    return out


def _score_remove_add(removed: ChangeItem, added: ChangeItem) -> list[_PairCandidate]:
    """Score removed against an added field and all nested leaves under it."""
    results: list[_PairCandidate] = []
    for dest in _flatten_added_leaves(added):
        cand = _score_remove_add_pair(removed, dest, source_added_id=added.id)
        if cand is not None:
            results.append(cand)
    return results


def _score_remove_add_pair(
    removed: ChangeItem,
    added: ChangeItem,
    source_added_id: str,
) -> _PairCandidate | None:
    from_leaf = leaf_key(removed.path)
    to_leaf = leaf_key(added.path)
    from_parent = parent_path(removed.path)
    to_parent = parent_path(added.path)

    name_sim = synonym_score(from_leaf, to_leaf)
    same_parent = from_parent == to_parent
    same_leaf = normalize_key(from_leaf) == normalize_key(to_leaf)
    deeper = path_depth(added.path) > path_depth(removed.path)

    before_t = _infer_type(removed.before_value)
    after_t = _infer_type(added.after_value)

    schema_before = (
        removed.before_value.get("type")
        if isinstance(removed.before_value, dict) and "type" in removed.before_value
        else None
    )
    schema_after = (
        added.after_value.get("type")
        if isinstance(added.after_value, dict) and "type" in added.after_value
        else None
    )
    is_schema_prop = schema_before is not None and schema_after is not None

    # Never correlate a scalar removal to a newly added object wrapper
    if not is_schema_prop:
        if after_t == "object" and before_t != "object":
            return None
        if before_t == "object" and after_t != "object":
            return None

    exact_value = _values_equal(removed.before_value, added.after_value)
    value_compat = _values_compatible(removed.before_value, added.after_value)
    bool_map = _boolean_enum_mapping(
        removed.before_value,
        added.after_value,
        from_leaf,
        to_leaf,
    )
    type_changed = before_t != after_t and before_t != "null" and after_t != "null"
    if is_schema_prop:
        type_changed = schema_before != schema_after
        before_t = str(schema_before)
        after_t = str(schema_after)
    ident = _is_identifier_pattern(from_leaf, to_leaf)
    timestamp = _is_timestamp_pattern(from_leaf, to_leaf)
    new_parent = deeper and same_leaf
    obj_sim = (
        _object_similarity(removed.before_value, added.after_value)
        if before_t == "object" and after_t == "object"
        else 0.0
    )

    reasons: list[str] = []
    score = 0.0

    # --- Relocate: same leaf name, new/deeper parent ---
    if same_leaf and from_parent != to_parent:
        score = 78.0
        reasons.append("Matching field name")
        if exact_value:
            score += 12.0
            reasons.append("Same value")
        elif value_compat:
            score += 6.0
            reasons.append("Compatible value")
        if before_t == after_t and before_t not in {"null", "object", "array"}:
            score += 5.0
            reasons.append("Same type")
        if new_parent or deeper:
            score += 5.0
            reasons.append("New parent object introduced")
        score = min(100.0, score)
        return _PairCandidate(
            removed=removed,
            added=added,
            source_added_id=source_added_id,
            score=score,
            kind=ChangeKind.RELOCATED,
            intent="relocate",
            mapping={
                "from_parent": from_parent,
                "to_parent": to_parent,
                "before_type": before_t,
                "after_type": after_t,
            },
            summary=f"Field relocated {removed.path} → {added.path}",
            reasons=reasons,
        )

    # --- Relocate + rename: root/nested move with synonym leaf ---
    if (
        from_parent != to_parent
        and not same_leaf
        and name_sim >= 0.75
        and (exact_value or value_compat)
        and before_t != "object"
    ):
        score = 72.0 + name_sim * 12.0
        reasons.append("Name semantic similarity")
        if exact_value:
            score += 14.0
            reasons.append("Same value")
        elif value_compat:
            score += 8.0
            reasons.append("Compatible value")
        if deeper:
            score += 8.0
            reasons.append("New parent object introduced")
        if name_sim >= 0.95:
            reasons.append(f"Known synonym: {from_leaf} → {to_leaf}")
        if exact_value and name_sim >= 0.8:
            score = max(score, 92.0)
        score = min(100.0, score)
        return _PairCandidate(
            removed=removed,
            added=added,
            source_added_id=source_added_id,
            score=score,
            kind=ChangeKind.RELOCATED,
            intent="relocate_rename",
            mapping={
                "from_parent": from_parent,
                "to_parent": to_parent,
                "before_type": before_t,
                "after_type": after_t,
                "renamed": True,
            },
            summary=f"Field relocated + renamed {removed.path} → {added.path}",
            reasons=reasons,
        )

    # --- Rename / transform scoring ---
    score += name_sim * 40.0
    if name_sim >= 0.95:
        reasons.append("Known naming / synonym match")
    elif name_sim >= 0.85:
        reasons.append("Field name similarity")
    elif name_sim >= 0.7:
        reasons.append("Partial name similarity")

    if same_parent:
        score += 18.0
        reasons.append("Same parent object")
    elif parent_path(from_parent) == parent_path(to_parent):
        score += 6.0
        reasons.append("Nearby object context")

    if exact_value:
        score += 24.0
        reasons.append("Same primitive value" if before_t != "object" else "Same nested values")
    elif value_compat:
        score += 14.0
        reasons.append("Compatible / coerced value")
    elif before_t == after_t and before_t not in {"null", "object", "array"}:
        score += 8.0
        reasons.append("Same type")

    if obj_sim >= 0.5:
        score += obj_sim * 22.0
        reasons.append("Same object structure")
        if obj_sim >= 0.85:
            reasons.append("Same child fields")

    if is_schema_prop and schema_before == schema_after:
        score += 20.0
        reasons.append("Same OpenAPI property schema type")

    if ident:
        score += 12.0
        reasons.append("Known identifier pattern")
    if timestamp:
        score += 12.0
        reasons.append("Timestamp naming pattern")

    if type_changed and name_sim >= 0.7:
        score += 10.0
        reasons.append("Type migration detected")

    # Calibration floors for strong conventional renames
    if name_sim >= 0.95 and same_parent and exact_value:
        score = max(score, 93.0)
    if name_sim >= 0.95 and same_parent and value_compat and type_changed:
        score = max(score, 92.0)
    if timestamp and exact_value:
        score = max(score, 94.0)
    if ident and (exact_value or value_compat):
        score = max(score, 91.0)
    if is_schema_prop and name_sim >= 0.95 and schema_before == schema_after:
        score = max(score, 90.0)
    if obj_sim >= 0.9 and name_sim >= 0.85:
        score = max(score, 93.0)
        if name_sim >= 0.95:
            reasons.append("Semantic address / object synonym")

    convention_bool = bool(bool_map and bool_map.get("convention"))
    if bool_map and (name_sim >= 0.45 or convention_bool):
        if convention_bool:
            reasons.append("Boolean payment / status indicator")
            reasons.append("New status-like field introduced")
            reasons.append("Enum token matches boolean meaning")
        else:
            reasons.append("Boolean → enum pattern")
        score = max(score, 92.0 if convention_bool else 90.0)
        return _PairCandidate(
            removed=removed,
            added=added,
            source_added_id=source_added_id,
            score=min(100.0, score),
            kind=ChangeKind.SEMANTIC_TRANSFORM,
            intent="boolean_to_enum",
            mapping={
                **bool_map,
                "before_type": before_t,
                "after_type": after_t,
            },
            summary=(
                f"Semantic transform {removed.path} ({before_t}) → "
                f"{added.path} ({after_t})"
            ),
            reasons=reasons,
        )

    if score < _HINT_FLOOR:
        return None

    mapping: dict[str, Any] = {
        "before_type": before_t,
        "after_type": after_t,
    }
    if type_changed:
        mapping["type_migration"] = f"{before_t} → {after_t}"
        mapping["compatible"] = before_t == "integer" and after_t == "number"
    if obj_sim:
        mapping["object_similarity"] = round(obj_sim, 3)

    if type_changed and name_sim >= 0.75:
        kind = ChangeKind.SEMANTIC_TRANSFORM
        intent = "rename_with_type"
        summary = (
            f"Rename detected {removed.path} → {added.path} "
            f"(type {before_t} → {after_t})"
        )
    else:
        kind = ChangeKind.RENAMED
        intent = "object_rename" if before_t == "object" and after_t == "object" else "rename"
        summary = f"Field renamed {removed.path} → {added.path}" if intent == "object_rename" else (
            f"Rename detected {removed.path} → {added.path}"
        )

    return _PairCandidate(
        removed=removed,
        added=added,
        source_added_id=source_added_id,
        score=min(100.0, score),
        kind=kind,
        intent=intent,
        mapping=mapping,
        summary=summary,
        reasons=reasons,
    )


def _score_path_successor(removed: ChangeItem, added: ChangeItem) -> _PairCandidate | None:
    if removed.kind != ChangeKind.PATH_REMOVED or added.kind != ChangeKind.PATH_ADDED:
        return None
    b = removed.path.removeprefix("paths.")
    a = added.path.removeprefix("paths.")
    bn = re.sub(r"/v\d+", "", b)
    an = re.sub(r"/v\d+", "", a)
    sim = string_similarity(bn, an)
    if sim < 0.55:
        return None
    score = 70.0 + sim * 25.0
    return _PairCandidate(
        removed=removed,
        added=added,
        source_added_id=added.id,
        score=min(100.0, score),
        kind=ChangeKind.RENAMED,
        intent="path_successor",
        mapping={"from_path": b, "to_path": a},
        summary=f"Likely path successor {b} → {a}",
        reasons=["Similar API path tokens", "Versioned path pattern"],
    )


def _enum_value_map(before_val: Any, after_val: Any) -> dict[str, Any] | None:
    if not isinstance(before_val, str) or not isinstance(after_val, str):
        return None
    if before_val == after_val:
        return None
    sim = string_similarity(before_val.lower(), after_val.lower())
    if sim < 0.35 and normalize_key(before_val) != normalize_key(after_val):
        if max(len(before_val), len(after_val)) > 12:
            return None
    return {before_val: after_val, "kind": "enum_value"}


def _correlate_value_changes(changes: list[ChangeItem], threshold: float) -> list[ChangeItem]:
    out: list[ChangeItem] = []
    for ch in changes:
        if ch.kind != ChangeKind.VALUE_CHANGED:
            out.append(ch)
            continue
        if isinstance(ch.before_value, str) and isinstance(ch.after_value, str):
            mapping = _enum_value_map(ch.before_value, ch.after_value)
            if mapping:
                sim = string_similarity(ch.before_value.lower(), ch.after_value.lower())
                score = 70.0 + sim * 25.0
                reasons = ["Enum-like string token change"]
                if (
                    len(ch.before_value) <= 16
                    and len(ch.after_value) <= 16
                    and ch.before_value.replace("_", "").isalnum()
                    and ch.after_value.replace("_", "").isalnum()
                ):
                    score = max(score, 90.0)
                    reasons.append("Short identifier enum tokens")
                if score >= threshold:
                    out.append(
                        ch.model_copy(
                            update={
                                "kind": ChangeKind.ENUM_MAPPED,
                                "classification": ChangeClassification.BREAKING,
                                "severity": ChangeSeverity.ERR,
                                "confidence": round(score, 1),
                                "intent": "enum_value",
                                "mapping": mapping,
                                "reasons": reasons,
                                "summary": (
                                    f'Enum value changed "{ch.before_value}" → '
                                    f'"{ch.after_value}" at {ch.path}'
                                ),
                            }
                        )
                    )
                    continue
        out.append(ch)
    return out


def _next_id(prefix: str, used: set[str]) -> str:
    i = 1
    while f"{prefix}{i}" in used:
        i += 1
    nid = f"{prefix}{i}"
    used.add(nid)
    return nid


def _dest_under(parent: str, dest: str) -> bool:
    if dest == parent:
        return True
    return dest.startswith(parent + ".")


def correlate_changes(
    changes: list[ChangeItem],
    before: Any = None,  # noqa: ARG001
    after: Any = None,  # noqa: ARG001
    threshold: float = 80.0,
) -> list[ChangeItem]:
    """Merge related structural ops into semantic changes when confidence >= threshold."""
    enriched: list[ChangeItem] = []
    for ch in changes:
        if ch.kind == ChangeKind.TYPE_CHANGED and not ch.mapping:
            bt, at = _infer_type(ch.before_value), _infer_type(ch.after_value)
            if (
                isinstance(ch.before_value, str)
                and isinstance(ch.after_value, str)
                and ch.path.endswith(".type")
            ):
                bt, at = ch.before_value, ch.after_value
            enriched.append(
                ch.model_copy(
                    update={
                        "mapping": {
                            "before_type": bt,
                            "after_type": at,
                            "compatible": bt == "integer" and at == "number",
                            "type_migration": f"{bt} → {at}",
                        },
                        "intent": ch.intent or "type_migration",
                        "reasons": ch.reasons
                        or ["Incompatible type change at same path"],
                    }
                )
            )
        else:
            enriched.append(ch)
    changes = _correlate_value_changes(enriched, threshold)

    removed = [
        c for c in changes if c.kind in {ChangeKind.REMOVED, ChangeKind.PATH_REMOVED}
    ]
    added = [c for c in changes if c.kind in {ChangeKind.ADDED, ChangeKind.PATH_ADDED}]

    candidates: list[_PairCandidate] = []
    for rem in removed:
        for add in added:
            if rem.kind == ChangeKind.PATH_REMOVED and add.kind == ChangeKind.PATH_ADDED:
                cand = _score_path_successor(rem, add)
                if cand is not None:
                    candidates.append(cand)
            elif rem.kind == ChangeKind.REMOVED and add.kind == ChangeKind.ADDED:
                candidates.extend(_score_remove_add(rem, add))

    candidates.sort(key=lambda c: c.score, reverse=True)

    used_removed: set[str] = set()
    used_dest_paths: set[str] = set()
    consumed_added_parents: set[str] = set()
    merged: list[ChangeItem] = []
    soft_hints: dict[str, str] = {}
    existing_ids = {c.id for c in changes}

    for cand in candidates:
        if cand.removed.id in used_removed:
            continue
        if cand.added.path in used_dest_paths:
            continue

        if cand.score >= threshold:
            used_removed.add(cand.removed.id)
            used_dest_paths.add(cand.added.path)
            consumed_added_parents.add(cand.source_added_id)
            nid = _next_id("sem_", existing_ids)
            merged.append(
                ChangeItem(
                    id=nid,
                    path=cand.added.path,
                    from_path=cand.removed.path,
                    kind=cand.kind,
                    classification=ChangeClassification.BREAKING,
                    severity=ChangeSeverity.ERR,
                    summary=cand.summary,
                    before_value=cand.removed.before_value,
                    after_value=cand.added.after_value,
                    confidence=round(cand.score, 1),
                    mapping=cand.mapping,
                    related_change_ids=[cand.removed.id, cand.source_added_id],
                    intent=cand.intent,
                    reasons=cand.reasons,
                )
            )
        elif cand.score >= _HINT_FLOOR and cand.removed.id not in soft_hints:
            soft_hints[cand.removed.id] = (
                f"Possible rename → {cand.added.path} (confidence {cand.score:.0f}%)"
            )

    def added_fully_explained(add: ChangeItem) -> bool:
        if add.id not in consumed_added_parents:
            return False
        return any(_dest_under(add.path, dest) for dest in used_dest_paths)

    result: list[ChangeItem] = list(merged)
    for ch in changes:
        if ch.id in used_removed:
            continue
        if ch.kind in {ChangeKind.ADDED, ChangeKind.PATH_ADDED} and added_fully_explained(ch):
            continue
        if ch.path in used_dest_paths:
            continue
        if ch.id in soft_hints:
            result.append(
                ch.model_copy(
                    update={
                        "summary": f"{ch.summary}. {soft_hints[ch.id]}",
                        "confidence": None,
                    }
                )
            )
        else:
            result.append(ch)

    result.sort(
        key=lambda c: (
            0
            if c.kind
            in {
                ChangeKind.RENAMED,
                ChangeKind.RELOCATED,
                ChangeKind.SEMANTIC_TRANSFORM,
                ChangeKind.ENUM_MAPPED,
            }
            else 1,
            c.path,
        )
    )
    return result

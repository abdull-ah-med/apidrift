"""JSON response structural diff using deepdiff.

Classification rules follow contract-change practice (additive response fields
are typically non-breaking; removals and incompatible type changes are breaking).
Reference model: https://www.oasdiff.com/docs/breaking-changes
"""

from __future__ import annotations

from typing import Any

from deepdiff import DeepDiff

from app.schemas.diff import (
    ChangeClassification,
    ChangeItem,
    ChangeKind,
    ChangeSeverity,
)


def _path_from_deepdiff(path: str) -> str:
    # DeepDiff paths look like "root['a'][0]['b']" — normalize to $.a[0].b
    cleaned = path.replace("root", "$")
    cleaned = cleaned.replace("']['", ".").replace("['", ".").replace("']", "")
    cleaned = cleaned.replace("].", "].")
    return cleaned


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


def _types_compatible(before_t: str, after_t: str) -> bool:
    if before_t == after_t:
        return True
    # integer is compatible with number widening in JSON samples
    if before_t == "integer" and after_t == "number":
        return True
    return False


def diff_json_responses(before: Any, after: Any) -> list[ChangeItem]:
    changes: list[ChangeItem] = []
    raw = DeepDiff(before, after, ignore_order=False, view="text")

    idx = 0

    for path in raw.get("dictionary_item_added", []):
        idx += 1
        p = _path_from_deepdiff(str(path))
        after_val = _value_at(after, p)
        changes.append(
            ChangeItem(
                id=f"chg_{idx}",
                path=p,
                kind=ChangeKind.ADDED,
                classification=ChangeClassification.NON_BREAKING,
                severity=ChangeSeverity.INFO,
                summary=f"Added field at {p}",
                before_value=None,
                after_value=after_val,
            )
        )

    for path in raw.get("dictionary_item_removed", []):
        idx += 1
        p = _path_from_deepdiff(str(path))
        before_val = _value_at(before, p)
        changes.append(
            ChangeItem(
                id=f"chg_{idx}",
                path=p,
                kind=ChangeKind.REMOVED,
                classification=ChangeClassification.BREAKING,
                severity=ChangeSeverity.ERR,
                summary=f"Removed field at {p}",
                before_value=before_val,
                after_value=None,
            )
        )

    for path, change in raw.get("type_changes", {}).items():
        idx += 1
        p = _path_from_deepdiff(str(path))
        old_val = change.get("old_value")
        new_val = change.get("new_value")
        before_t = _infer_type(old_val)
        after_t = _infer_type(new_val)
        compatible = _types_compatible(before_t, after_t)
        if old_val is not None and new_val is None:
            kind = ChangeKind.NULLABILITY_ADDED
            classification = ChangeClassification.NON_BREAKING
            severity = ChangeSeverity.INFO
            summary = f"Value at {p} became nullable ({before_t} → null)"
        elif old_val is None and new_val is not None:
            kind = ChangeKind.NULLABILITY_REMOVED
            classification = ChangeClassification.BREAKING
            severity = ChangeSeverity.ERR
            summary = f"Nullability removed at {p} (null → {after_t})"
        elif compatible:
            kind = ChangeKind.TYPE_CHANGED
            classification = ChangeClassification.NON_BREAKING
            severity = ChangeSeverity.INFO
            summary = f"Compatible type change at {p}: {before_t} → {after_t}"
        else:
            kind = ChangeKind.TYPE_CHANGED
            classification = ChangeClassification.BREAKING
            severity = ChangeSeverity.ERR
            summary = f"Incompatible type change at {p}: {before_t} → {after_t}"
        changes.append(
            ChangeItem(
                id=f"chg_{idx}",
                path=p,
                kind=kind,
                classification=classification,
                severity=severity,
                summary=summary,
                before_value=old_val,
                after_value=new_val,
            )
        )

    for path, change in raw.get("values_changed", {}).items():
        idx += 1
        p = _path_from_deepdiff(str(path))
        old_val = change.get("old_value")
        new_val = change.get("new_value")
        before_t = _infer_type(old_val)
        after_t = _infer_type(new_val)
        if before_t != after_t and not _types_compatible(before_t, after_t):
            changes.append(
                ChangeItem(
                    id=f"chg_{idx}",
                    path=p,
                    kind=ChangeKind.TYPE_CHANGED,
                    classification=ChangeClassification.BREAKING,
                    severity=ChangeSeverity.ERR,
                    summary=f"Incompatible type change at {p}: {before_t} → {after_t}",
                    before_value=old_val,
                    after_value=new_val,
                )
            )
        else:
            # Sample value drift is informational for response payloads
            changes.append(
                ChangeItem(
                    id=f"chg_{idx}",
                    path=p,
                    kind=ChangeKind.VALUE_CHANGED,
                    classification=ChangeClassification.NON_BREAKING,
                    severity=ChangeSeverity.INFO,
                    summary=f"Sample value changed at {p}",
                    before_value=old_val,
                    after_value=new_val,
                )
            )

    for path in raw.get("iterable_item_added", []):
        idx += 1
        p = _path_from_deepdiff(str(path))
        changes.append(
            ChangeItem(
                id=f"chg_{idx}",
                path=p,
                kind=ChangeKind.ADDED,
                classification=ChangeClassification.NON_BREAKING,
                severity=ChangeSeverity.INFO,
                summary=f"Array item added at {p}",
                before_value=None,
                after_value=_value_at(after, p),
            )
        )

    for path in raw.get("iterable_item_removed", []):
        idx += 1
        p = _path_from_deepdiff(str(path))
        changes.append(
            ChangeItem(
                id=f"chg_{idx}",
                path=p,
                kind=ChangeKind.REMOVED,
                classification=ChangeClassification.BREAKING,
                severity=ChangeSeverity.WARN,
                summary=f"Array item removed at {p}",
                before_value=_value_at(before, p),
                after_value=None,
            )
        )

    return changes


def _value_at(doc: Any, path: str) -> Any:
    """Best-effort lookup for display; failures return None."""
    if path in ("$", "root"):
        return doc
    current = doc
    # Very small path walker for $.a.b[0].c shapes
    token = path[1:] if path.startswith("$") else path
    parts: list[str] = []
    buf = ""
    i = 0
    while i < len(token):
        ch = token[i]
        if ch == ".":
            if buf:
                parts.append(buf)
                buf = ""
            i += 1
            continue
        if ch == "[":
            if buf:
                parts.append(buf)
                buf = ""
            j = token.find("]", i)
            if j == -1:
                return None
            parts.append(token[i : j + 1])
            i = j + 1
            continue
        buf += ch
        i += 1
    if buf:
        parts.append(buf)

    try:
        for part in parts:
            if part.startswith("[") and part.endswith("]"):
                current = current[int(part[1:-1])]
            else:
                current = current[part]
        return current
    except (KeyError, IndexError, TypeError, ValueError):
        return None

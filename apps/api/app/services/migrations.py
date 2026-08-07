"""Deterministic migration snippet generators — emit the NEW contract shape."""

from __future__ import annotations

import re
from typing import Any

from app.schemas.diff import (
    ChangeItem,
    ChangeKind,
    DiffLanguage,
    MigrationSnippet,
)

_MIGRATE_KINDS = {
    ChangeKind.REMOVED,
    ChangeKind.RENAMED,
    ChangeKind.RELOCATED,
    ChangeKind.SEMANTIC_TRANSFORM,
    ChangeKind.ENUM_MAPPED,
    ChangeKind.TYPE_CHANGED,
    ChangeKind.REQUIRED_ADDED,
    ChangeKind.PATH_REMOVED,
    ChangeKind.OPERATION_REMOVED,
    ChangeKind.RESPONSE_REMOVED,
    ChangeKind.NULLABILITY_REMOVED,
    ChangeKind.ENUM_NARROWED,
}

_TRANSFORM_KINDS = {
    ChangeKind.RENAMED,
    ChangeKind.RELOCATED,
    ChangeKind.SEMANTIC_TRANSFORM,
    ChangeKind.ENUM_MAPPED,
    ChangeKind.TYPE_CHANGED,
}

_ARRAY_INDEX_RE = re.compile(r"\[\d+\]")


def generate_snippets(
    changes: list[ChangeItem],
    languages: list[DiffLanguage],
    before: Any = None,
    after: Any = None,
) -> list[MigrationSnippet]:
    breaking = [
        c
        for c in changes
        if c.classification.value == "breaking" or c.kind in _MIGRATE_KINDS
    ]
    if not breaking and before is None and after is None:
        return []

    snippets: list[MigrationSnippet] = []
    related = [c.id for c in breaking] if breaking else [c.id for c in changes]

    if DiffLanguage.TYPESCRIPT in languages:
        snippets.append(
            MigrationSnippet(
                language=DiffLanguage.TYPESCRIPT,
                title="TypeScript client adaptations",
                related_change_ids=related,
                code=_typescript(breaking, before=before, after=after, all_changes=changes),
            )
        )
    if DiffLanguage.PYTHON in languages:
        snippets.append(
            MigrationSnippet(
                language=DiffLanguage.PYTHON,
                title="Python client adaptations",
                related_change_ids=related,
                code=_python(breaking, before=before, after=after, all_changes=changes),
            )
        )
    if DiffLanguage.CURL in languages:
        snippets.append(
            MigrationSnippet(
                language=DiffLanguage.CURL,
                title="curl / request checklist",
                related_change_ids=related,
                code=_curl(breaking or changes),
            )
        )
    return snippets


def _strip_root(path: str) -> str:
    if path.startswith("$."):
        return path[2:]
    if path.startswith("$"):
        return path[1:]
    return path


def _path_parts(path: str) -> list[str]:
    p = _strip_root(path).replace("[", ".").replace("]", "")
    return [part for part in p.split(".") if part]


def _normalize_array_path(path: str) -> str:
    return _ARRAY_INDEX_RE.sub("[*]", path)


def _ts_access(path: str, root: str = "old") -> str:
    parts = _path_parts(path)
    out = root
    for part in parts:
        if part.isdigit():
            out += f"[{part}]"
        else:
            out += f"[{part!r}]"
    return out


def _py_access(path: str, root: str = "old") -> str:
    parts = _path_parts(path)
    out = root
    for part in parts:
        if part.isdigit():
            out += f"[{part}]"
        else:
            out += f"[{part!r}]"
    return out


def _coerce_ts(expr: str, before_t: str | None, after_t: str | None) -> str:
    if before_t in {"integer", "number"} and after_t == "string":
        return f"String({expr})"
    if before_t == "string" and after_t in {"integer", "number"}:
        return f"Number({expr})"
    return expr


def _coerce_py(expr: str, before_t: str | None, after_t: str | None) -> str:
    if before_t in {"integer", "number"} and after_t == "string":
        return f"str({expr})"
    if before_t == "string" and after_t in {"integer", "number"}:
        return f"float({expr}) if '.' in str({expr}) else int({expr})"
    return expr


def _mapping_types(mapping: dict[str, Any] | None) -> tuple[str | None, str | None]:
    if not mapping:
        return None, None
    return (
        mapping.get("before_type") if isinstance(mapping.get("before_type"), str) else None,
        mapping.get("after_type") if isinstance(mapping.get("after_type"), str) else None,
    )


def _infer_sample_type(value: Any) -> str | None:
    if value is None:
        return None
    if isinstance(value, bool):
        return "boolean"
    if isinstance(value, int) and not isinstance(value, bool):
        return "integer"
    if isinstance(value, float):
        return "number"
    if isinstance(value, str):
        return "string"
    return None


def _strip_array_prefix(path: str, array_path: str) -> str | None:
    """Return relative path under array item, e.g. items[0].id → id."""
    norm = _normalize_array_path(path)
    arr_norm = _normalize_array_path(array_path) + "[*]"
    if norm == arr_norm:
        return ""
    prefix = arr_norm + "."
    if not norm.startswith(prefix):
        return None
    return norm[len(prefix) :]


def _expr_for_change(ch: ChangeItem, *, lang: str, root: str = "old") -> str | None:
    src_path = ch.from_path or ch.path
    before_t, after_t = _mapping_types(ch.mapping)
    if lang == "ts":
        src = _ts_access(src_path, root)
        coerce = _coerce_ts
    else:
        src = _py_access(src_path, root)
        coerce = _coerce_py

    if ch.kind == ChangeKind.RELOCATED:
        return src

    if ch.kind == ChangeKind.RENAMED:
        return coerce(src, before_t, after_t)

    if ch.kind == ChangeKind.SEMANTIC_TRANSFORM:
        mapping = ch.mapping or {}
        if mapping.get("kind") == "boolean_to_enum" or ch.intent == "boolean_to_enum":
            true_v = mapping.get("true", "ACTIVE")
            false_v = mapping.get("false", "INACTIVE")
            if lang == "ts":
                return f"{src} ? {true_v!r} : {false_v!r}"
            return f"{true_v!r} if {src} else {false_v!r}"
        return coerce(src, before_t, after_t)

    if ch.kind == ChangeKind.ENUM_MAPPED:
        mapping = {k: v for k, v in (ch.mapping or {}).items() if k != "kind"}
        if not mapping:
            return src
        if lang == "ts":
            if len(mapping) == 1:
                old_v, new_v = next(iter(mapping.items()))
                return f"{src} === {old_v!r} ? {new_v!r} : {src}"
            parts = [f"{src} === {k!r} ? {v!r}" for k, v in mapping.items()]
            return " : ".join(parts) + f" : {src}"
        if len(mapping) == 1:
            old_v, new_v = next(iter(mapping.items()))
            return f"{new_v!r} if {src} == {old_v!r} else {src}"
        cases = ", ".join(f"{k!r}: {v!r}" for k, v in mapping.items())
        return f"{{{cases}}}.get({src}, {src})"

    if ch.kind == ChangeKind.TYPE_CHANGED:
        bt = before_t or _infer_sample_type(ch.before_value)
        at = after_t or _infer_sample_type(ch.after_value)
        if lang == "ts":
            return coerce(_ts_access(ch.path, root), bt, at)
        return coerce(_py_access(ch.path, root), bt, at)

    return None


def _index_transforms(changes: list[ChangeItem]) -> dict[str, ChangeItem]:
    out: dict[str, ChangeItem] = {}
    for ch in changes:
        if ch.kind not in _TRANSFORM_KINDS:
            continue
        out[ch.path] = ch
        out[_normalize_array_path(ch.path)] = ch
    return out


def _get_by_path(doc: Any, path: str) -> Any:
    if doc is None:
        return None
    parts = _path_parts(path)
    cur = doc
    for part in parts:
        if isinstance(cur, dict) and part in cur:
            cur = cur[part]
        elif isinstance(cur, list) and part.isdigit():
            idx = int(part)
            if 0 <= idx < len(cur):
                cur = cur[idx]
            else:
                return None
        else:
            return None
    return cur


def _literal(value: Any, *, lang: str) -> str:
    if value is None:
        return "null" if lang == "ts" else "None"
    if isinstance(value, bool):
        if lang == "ts":
            return "true" if value else "false"
        return "True" if value else "False"
    if isinstance(value, (int, float)):
        return repr(value)
    if isinstance(value, str):
        return repr(value)
    if isinstance(value, list):
        inner = ", ".join(_literal(v, lang=lang) for v in value)
        return f"[{inner}]"
    if isinstance(value, dict):
        if lang == "ts":
            parts = [f"{k}: {_literal(v, lang=lang)}" for k, v in value.items()]
            return "{ " + ", ".join(parts) + " }"
        parts = [f"{k!r}: {_literal(v, lang=lang)}" for k, v in value.items()]
        return "{ " + ", ".join(parts) + " }"
    return repr(value)


def _render_ts_object(tree: dict[str, Any], indent: int) -> list[str]:
    pad = "  " * indent
    inner = "  " * (indent + 1)
    lines: list[str] = ["{"]
    items = list(tree.items())
    for i, (key, value) in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        if isinstance(value, dict):
            nested = _render_ts_object(value, indent + 1)
            lines.append(f"{inner}{key}: {nested[0]}")
            lines.extend(nested[1:-1])
            lines.append(f"{inner}}}{comma}")
        else:
            lines.append(f"{inner}{key}: {value}{comma}")
    lines.append(f"{pad}}}")
    return lines


def _render_py_object(tree: dict[str, Any], indent: int) -> list[str]:
    pad = "    " * indent
    inner = "    " * (indent + 1)
    lines: list[str] = ["{"]
    items = list(tree.items())
    for i, (key, value) in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        if isinstance(value, dict):
            nested = _render_py_object(value, indent + 1)
            lines.append(f"{inner}{key!r}: {nested[0]}")
            lines.extend(nested[1:-1])
            lines.append(f"{inner}}}{comma}")
        else:
            lines.append(f"{inner}{key!r}: {value}{comma}")
    lines.append(f"{pad}}}")
    return lines


def _array_item_transforms(
    transforms: dict[str, ChangeItem],
    array_path: str,
) -> dict[str, ChangeItem]:
    """Map after-item leaf key → change for items under array_path."""
    out: dict[str, ChangeItem] = {}
    arr_norm = _normalize_array_path(array_path)
    for path, ch in transforms.items():
        rel = _strip_array_prefix(path, arr_norm)
        if rel is None or rel == "" or "." in rel:
            continue
        # Prefer paths with real indices; normalized [*] also stored
        if "[*]" in path and rel in out:
            continue
        out[rel] = ch
    return out


def _item_source_access(from_path: str, array_path: str, *, lang: str) -> str:
    """Turn $.items[0].id into item['id'] given array $.items."""
    rel = _strip_array_prefix(from_path, array_path)
    if rel is None:
        # fallback: last leaf
        leaf = _path_parts(from_path)[-1]
        return f"item[{leaf!r}]" if lang == "py" else f"item[{leaf!r}]"
    if not rel:
        return "item"
    parts = rel.replace("[*]", "").split(".")
    parts = [p for p in parts if p and p != "*"]
    expr = "item"
    for part in parts:
        expr += f"[{part!r}]"
    return expr


def _build_array_map_expr(
    array_path: str,
    after_item: dict[str, Any],
    before_item: dict[str, Any] | None,
    transforms: dict[str, ChangeItem],
    *,
    lang: str,
) -> str:
    item_tx = _array_item_transforms(transforms, array_path)
    fields: dict[str, str] = {}

    for key, after_val in after_item.items():
        ch = item_tx.get(key)
        if ch is not None:
            src_path = ch.from_path or ch.path
            before_t, after_t = _mapping_types(ch.mapping)
            src = _item_source_access(src_path, array_path, lang=lang)
            if ch.kind == ChangeKind.SEMANTIC_TRANSFORM and (
                (ch.mapping or {}).get("kind") == "boolean_to_enum"
                or ch.intent == "boolean_to_enum"
            ):
                true_v = (ch.mapping or {}).get("true", "ACTIVE")
                false_v = (ch.mapping or {}).get("false", "INACTIVE")
                fields[key] = (
                    f"{src} ? {true_v!r} : {false_v!r}"
                    if lang == "ts"
                    else f"{true_v!r} if {src} else {false_v!r}"
                )
            elif ch.kind == ChangeKind.ENUM_MAPPED:
                mapping = {k: v for k, v in (ch.mapping or {}).items() if k != "kind"}
                if len(mapping) == 1:
                    old_v, new_v = next(iter(mapping.items()))
                    fields[key] = (
                        f"{src} === {old_v!r} ? {new_v!r} : {src}"
                        if lang == "ts"
                        else f"{new_v!r} if {src} == {old_v!r} else {src}"
                    )
                else:
                    fields[key] = (
                        _coerce_ts(src, before_t, after_t)
                        if lang == "ts"
                        else _coerce_py(src, before_t, after_t)
                    )
            else:
                fields[key] = (
                    _coerce_ts(src, before_t, after_t)
                    if lang == "ts"
                    else _coerce_py(src, before_t, after_t)
                )
        elif before_item is not None and key in before_item:
            fields[key] = f"item[{key!r}]"
        else:
            fields[key] = _literal(after_val, lang=lang)

    if lang == "ts":
        arr = _ts_access(array_path, "old")
        parts = ", ".join(f"{k}: {v}" for k, v in fields.items())
        return f"({arr} ?? []).map((item) => ({{ {parts} }}))"

    arr = _py_access(array_path, "old")
    flat_fields = ", ".join(f"{k!r}: {v}" for k, v in fields.items())
    return f"[{{{flat_fields}}} for item in ({arr} or [])]"


def _build_value_tree(
    after_node: Any,
    path: str,
    before_doc: Any,
    transforms: dict[str, ChangeItem],
    *,
    lang: str,
) -> Any:
    """Build nested dict of expression strings mirroring the after shape."""
    ch = transforms.get(path) or transforms.get(_normalize_array_path(path))

    # Whole-object rename (shippingAddress → deliveryAddress)
    if (
        ch is not None
        and ch.kind == ChangeKind.RENAMED
        and isinstance(after_node, dict)
        and isinstance(ch.before_value, dict)
    ):
        expr = _expr_for_change(ch, lang=lang)
        if expr is not None:
            return expr

    # Scalar / non-container transform at this path
    if ch is not None and not isinstance(after_node, (dict, list)):
        expr = _expr_for_change(ch, lang=lang)
        if expr is not None:
            return expr

    if isinstance(after_node, list):
        if after_node and isinstance(after_node[0], dict):
            before_list = _get_by_path(before_doc, path)
            before_item = (
                before_list[0]
                if isinstance(before_list, list)
                and before_list
                and isinstance(before_list[0], dict)
                else None
            )
            item_tx = _array_item_transforms(transforms, path)
            if item_tx or (
                before_item is not None and set(before_item.keys()) != set(after_node[0].keys())
            ):
                return _build_array_map_expr(
                    path,
                    after_node[0],
                    before_item,
                    transforms,
                    lang=lang,
                )
            return _ts_access(path, "old") if lang == "ts" else _py_access(path, "old")
        if _get_by_path(before_doc, path) is not None:
            return _ts_access(path, "old") if lang == "ts" else _py_access(path, "old")
        return _literal(after_node, lang=lang)

    if isinstance(after_node, dict):
        tree: dict[str, Any] = {}
        for key, val in after_node.items():
            child_path = f"{path}.{key}" if path != "$" else f"$.{key}"
            child_ch = transforms.get(child_path) or transforms.get(
                _normalize_array_path(child_path)
            )

            if child_ch is not None and not isinstance(val, (dict, list)):
                expr = _expr_for_change(child_ch, lang=lang)
                if expr is not None:
                    tree[key] = expr
                    continue

            if isinstance(val, (dict, list)):
                tree[key] = _build_value_tree(
                    val,
                    child_path,
                    before_doc,
                    transforms,
                    lang=lang,
                )
                continue

            if child_ch is not None:
                expr = _expr_for_change(child_ch, lang=lang)
                if expr is not None:
                    tree[key] = expr
                    continue

            if _get_by_path(before_doc, child_path) is not None:
                tree[key] = (
                    _ts_access(child_path, "old")
                    if lang == "ts"
                    else _py_access(child_path, "old")
                )
                continue

            tree[key] = _literal(val, lang=lang)
        return tree

    if ch is not None:
        expr = _expr_for_change(ch, lang=lang)
        if expr is not None:
            return expr
    if _get_by_path(before_doc, path) is not None:
        return _ts_access(path, "old") if lang == "ts" else _py_access(path, "old")
    return _literal(after_node, lang=lang)


def _fallback_assignments(changes: list[ChangeItem], *, lang: str) -> dict[str, Any]:
    """When no after sample, nest only transformed fields (legacy behavior)."""
    root: dict[str, Any] = {}
    for ch in changes:
        if ch.kind not in _TRANSFORM_KINDS:
            continue
        expr = _expr_for_change(ch, lang=lang)
        if expr is None:
            continue
        parts = _path_parts(ch.path)
        if not parts:
            continue
        # Skip numeric array indices as object keys — prefer array path collapse later
        cursor = root
        for i, part in enumerate(parts[:-1]):
            if part.isdigit():
                # convert to map-unfriendly structure; leave for complete path only
                part = part
            nxt = cursor.get(part)
            if not isinstance(nxt, dict):
                nxt = {}
                cursor[part] = nxt
            cursor = nxt
            _ = i
        cursor[parts[-1]] = expr
    return root


def _typescript(
    changes: list[ChangeItem],
    *,
    before: Any = None,
    after: Any = None,
    all_changes: list[ChangeItem] | None = None,
) -> str:
    pool = all_changes or changes
    removals = [c for c in pool if c.kind == ChangeKind.REMOVED]
    api_ops = [
        c
        for c in pool
        if c.kind
        in {
            ChangeKind.PATH_REMOVED,
            ChangeKind.OPERATION_REMOVED,
            ChangeKind.REQUIRED_ADDED,
            ChangeKind.RESPONSE_REMOVED,
        }
    ]

    lines = [
        "// APIDrift - TypeScript client adaptations",
        "// Maps OLD response shape → NEW response shape",
        "type Before = Record<string, any>;",
        "type After = Record<string, any>;",
        "",
        "export function migratePayload(old: Before): After {",
    ]

    transforms = _index_transforms(pool)
    if isinstance(after, dict):
        tree = _build_value_tree(after, "$", before, transforms, lang="ts")
        if isinstance(tree, dict):
            obj_lines = _render_ts_object(tree, indent=1)
            lines.append(f"  return {obj_lines[0]}")
            lines.extend(obj_lines[1:])
            lines[-1] = lines[-1] + ";"
        else:
            lines.append(f"  return {tree};")
    else:
        tree = _fallback_assignments(changes, lang="ts")
        if tree:
            obj_lines = _render_ts_object(tree, indent=1)
            lines.append(f"  return {obj_lines[0]}")
            lines.extend(obj_lines[1:])
            lines[-1] = lines[-1] + ";"
        else:
            lines.append("  const after: After = { ...old };")
            for rem in removals:
                lines.append(f"  // BREAKING: remove usage of {rem.path}")
            lines.append("  return after;")

    for rem in removals:
        lines.append(f"  // BREAKING: stop reading {rem.path}")
    for op in api_ops:
        lines.append(f"  // {op.summary}")
    lines.append("}")
    return "\n".join(lines)


def _python(
    changes: list[ChangeItem],
    *,
    before: Any = None,
    after: Any = None,
    all_changes: list[ChangeItem] | None = None,
) -> str:
    pool = all_changes or changes
    removals = [c for c in pool if c.kind == ChangeKind.REMOVED]
    api_ops = [
        c
        for c in pool
        if c.kind
        in {
            ChangeKind.PATH_REMOVED,
            ChangeKind.OPERATION_REMOVED,
            ChangeKind.REQUIRED_ADDED,
            ChangeKind.RESPONSE_REMOVED,
        }
    ]

    lines = [
        "# APIDrift - Python client adaptations",
        "# Maps OLD response shape → NEW response shape",
        "from typing import Any",
        "",
        "def migrate_payload(old: dict[str, Any]) -> dict[str, Any]:",
    ]

    transforms = _index_transforms(pool)
    if isinstance(after, dict):
        tree = _build_value_tree(after, "$", before, transforms, lang="py")
        if isinstance(tree, dict):
            obj_lines = _render_py_object(tree, indent=1)
            lines.append(f"    return {obj_lines[0]}")
            lines.extend(obj_lines[1:])
        else:
            lines.append(f"    return {tree}")
    else:
        tree = _fallback_assignments(changes, lang="py")
        if tree:
            obj_lines = _render_py_object(tree, indent=1)
            lines.append(f"    return {obj_lines[0]}")
            lines.extend(obj_lines[1:])
        else:
            lines.append("    after = dict(old)")
            for rem in removals:
                leaf = _path_parts(rem.path)[-1] if _path_parts(rem.path) else rem.path
                lines.append(f"    # BREAKING: remove usage of {rem.path}")
                lines.append(f"    # after.pop({leaf!r}, None)")
            lines.append("    return after")

    for rem in removals:
        lines.append(f"    # BREAKING: stop reading {rem.path}")
    for op in api_ops:
        lines.append(f"    # {op.summary}")
    return "\n".join(lines)


def _curl(changes: list[ChangeItem]) -> str:
    lines = ["# APIDrift - request checklist"]
    for ch in changes:
        conf = f" ({ch.confidence:.0f}%)" if ch.confidence is not None else ""
        lines.append(f"# [{ch.severity.value}] {ch.summary}{conf}")
        if ch.from_path and ch.path:
            lines.append(f"#   map {ch.from_path} → {ch.path}")
        if ch.reasons:
            for reason in ch.reasons:
                lines.append(f"#   ✓ {reason}")
        if ch.kind == ChangeKind.REQUIRED_ADDED:
            lines.append(f"# Ensure request includes: {ch.path}")
        if ch.kind in {ChangeKind.PATH_REMOVED, ChangeKind.OPERATION_REMOVED}:
            lines.append(f"# Replace calls to: {ch.from_path or ch.path}")
        if ch.kind == ChangeKind.REMOVED:
            lines.append(f"# Stop reading response field: {ch.path}")
    lines.append('# curl -sS "$BASE_URL/your-updated-path" | jq .')
    return "\n".join(lines)

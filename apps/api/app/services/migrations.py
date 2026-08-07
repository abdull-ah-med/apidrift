"""Deterministic migration snippet generators."""

from __future__ import annotations

from app.schemas.diff import (
    ChangeItem,
    ChangeKind,
    DiffLanguage,
    MigrationSnippet,
)


def generate_snippets(
    changes: list[ChangeItem],
    languages: list[DiffLanguage],
) -> list[MigrationSnippet]:
    breaking = [
        c
        for c in changes
        if c.classification.value == "breaking" or c.kind
        in {
            ChangeKind.REMOVED,
            ChangeKind.TYPE_CHANGED,
            ChangeKind.REQUIRED_ADDED,
            ChangeKind.PATH_REMOVED,
            ChangeKind.OPERATION_REMOVED,
            ChangeKind.RESPONSE_REMOVED,
            ChangeKind.NULLABILITY_REMOVED,
            ChangeKind.ENUM_NARROWED,
        }
    ]
    if not breaking:
        return []

    snippets: list[MigrationSnippet] = []
    related = [c.id for c in breaking]

    if DiffLanguage.TYPESCRIPT in languages:
        snippets.append(
            MigrationSnippet(
                language=DiffLanguage.TYPESCRIPT,
                title="TypeScript client adaptations",
                related_change_ids=related,
                code=_typescript(breaking),
            )
        )
    if DiffLanguage.PYTHON in languages:
        snippets.append(
            MigrationSnippet(
                language=DiffLanguage.PYTHON,
                title="Python client adaptations",
                related_change_ids=related,
                code=_python(breaking),
            )
        )
    if DiffLanguage.CURL in languages:
        snippets.append(
            MigrationSnippet(
                language=DiffLanguage.CURL,
                title="curl / request checklist",
                related_change_ids=related,
                code=_curl(breaking),
            )
        )
    return snippets


def _typescript(changes: list[ChangeItem]) -> str:
    lines = [
        "// APIDrift — TypeScript migration hints",
        "type Before = Record<string, unknown>;",
        "type After = Record<string, unknown>;",
        "",
        "export function migratePayload(before: Before): After {",
        "  const after: After = { ...before };",
    ]
    for ch in changes:
        path = ch.path
        if ch.kind == ChangeKind.REMOVED:
            lines.append(f"  // BREAKING: remove usage of {path}")
            lines.append(f"  // delete after{ _ts_access(path) };")
        elif ch.kind == ChangeKind.TYPE_CHANGED:
            lines.append(
                f"  // BREAKING: {path} type {ch.before_value!r} → {ch.after_value!r}"
            )
            lines.append(
                f"  // after{_ts_access(path)} = /* coerce to new type */ after{_ts_access(path)};"
            )
        elif ch.kind == ChangeKind.REQUIRED_ADDED:
            lines.append(f"  // BREAKING: supply required field {path}")
            lines.append(f"  // after{_ts_access(path)} = /* required */;")
        elif ch.kind in {ChangeKind.PATH_REMOVED, ChangeKind.OPERATION_REMOVED}:
            lines.append(f"  // BREAKING: stop calling {path}")
        else:
            lines.append(f"  // Review: {ch.summary}")
    lines.append("  return after;")
    lines.append("}")
    return "\n".join(lines)


def _python(changes: list[ChangeItem]) -> str:
    lines = [
        "# APIDrift — Python migration hints",
        "from typing import Any",
        "",
        "def migrate_payload(before: dict[str, Any]) -> dict[str, Any]:",
        "    after = dict(before)",
    ]
    for ch in changes:
        if ch.kind == ChangeKind.REMOVED:
            lines.append(f"    # BREAKING: remove usage of {ch.path}")
            lines.append(f"    # after.pop('{ch.path}', None)")
        elif ch.kind == ChangeKind.TYPE_CHANGED:
            lines.append(
                f"    # BREAKING: {ch.path} type changed "
                f"({ch.before_value!r} → {ch.after_value!r})"
            )
        elif ch.kind == ChangeKind.REQUIRED_ADDED:
            lines.append(f"    # BREAKING: set required field {ch.path}")
        elif ch.kind in {ChangeKind.PATH_REMOVED, ChangeKind.OPERATION_REMOVED}:
            lines.append(f"    # BREAKING: stop calling {ch.path}")
        else:
            lines.append(f"    # Review: {ch.summary}")
    lines.append("    return after")
    return "\n".join(lines)


def _curl(changes: list[ChangeItem]) -> str:
    lines = ["# APIDrift — request checklist"]
    for ch in changes:
        lines.append(f"# [{ch.severity.value}] {ch.summary}")
        if ch.kind == ChangeKind.REQUIRED_ADDED:
            lines.append(f"# Ensure request includes: {ch.path}")
        if ch.kind in {ChangeKind.PATH_REMOVED, ChangeKind.OPERATION_REMOVED}:
            lines.append(f"# Replace calls to: {ch.path}")
        if ch.kind == ChangeKind.REMOVED:
            lines.append(f"# Stop reading response field: {ch.path}")
    lines.append("# curl -sS \"$BASE_URL/your-updated-path\" | jq .")
    return "\n".join(lines)


def _ts_access(path: str) -> str:
    if path.startswith("$."):
        path = path[2:]
    elif path.startswith("$"):
        path = path[1:]
    if not path:
        return ""
    parts = path.replace("[", ".").replace("]", "").split(".")
    out = ""
    for part in parts:
        if not part:
            continue
        if part.isdigit():
            out += f"[{part}]"
        else:
            out += f"[{part!r}]"
    return out

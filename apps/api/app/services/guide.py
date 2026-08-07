"""Markdown Migration Guide builder and executive summary."""

from __future__ import annotations

from app.schemas.diff import (
    ChangeClassification,
    ChangeItem,
    ChangeKind,
    ChangeSeverity,
    DiffResult,
    ExecutiveSummary,
    OverallRisk,
)


def build_executive_summary(changes: list[ChangeItem]) -> ExecutiveSummary:
    breaking = [c for c in changes if c.classification == ChangeClassification.BREAKING]
    has_err = any(c.severity == ChangeSeverity.ERR for c in breaking)
    has_warn_breaking = any(c.severity == ChangeSeverity.WARN for c in breaking)

    if has_err:
        risk = OverallRisk.HIGH
    elif has_warn_breaking or breaking:
        risk = OverallRisk.MEDIUM
    else:
        risk = OverallRisk.LOW

    likely_renames = sum(
        1
        for c in changes
        if c.kind == ChangeKind.RENAMED
        or (c.kind == ChangeKind.SEMANTIC_TRANSFORM and c.intent == "rename_with_type")
        or (c.kind == ChangeKind.RELOCATED and c.intent == "relocate_rename")
    )
    type_migrations = sum(
        1
        for c in changes
        if c.kind == ChangeKind.TYPE_CHANGED
        or c.intent == "rename_with_type"
        or (
            c.kind in {ChangeKind.RENAMED, ChangeKind.SEMANTIC_TRANSFORM}
            and (c.mapping or {}).get("type_migration")
            and c.intent != "boolean_to_enum"
        )
    )
    enum_migrations = sum(
        1
        for c in changes
        if c.kind in {ChangeKind.ENUM_MAPPED, ChangeKind.ENUM_NARROWED, ChangeKind.ENUM_WIDENED}
    )
    boolean_transformations = sum(1 for c in changes if c.intent == "boolean_to_enum")
    field_relocations = sum(1 for c in changes if c.kind == ChangeKind.RELOCATED)
    removed_fields = sum(1 for c in changes if c.kind == ChangeKind.REMOVED)
    safe_additions = sum(
        1
        for c in changes
        if c.kind == ChangeKind.ADDED and c.classification == ChangeClassification.NON_BREAKING
    )

    restructure_parents: set[str] = set()
    object_renames = 0
    for c in changes:
        if c.kind == ChangeKind.RELOCATED:
            parent = c.path.rsplit(".", 1)[0] if "." in c.path else c.path
            # strip trailing array index tokens for grouping
            parent = parent.split("[")[0]
            restructure_parents.add(parent)
        if (
            c.kind == ChangeKind.RENAMED
            and isinstance(c.before_value, dict)
            and isinstance(c.after_value, dict)
        ):
            object_renames += 1
    object_restructures = len(restructure_parents) + object_renames

    effort_score = (
        len(breaking)
        + field_relocations
        + likely_renames
        + boolean_transformations
        + enum_migrations
        + object_restructures
    )
    if effort_score == 0:
        estimated = "0 minutes"
    elif effort_score <= 2:
        estimated = "5-15 minutes"
    elif effort_score <= 5:
        estimated = "15-45 minutes"
    else:
        estimated = "1-3 hours"

    return ExecutiveSummary(
        overall_risk=risk,
        breaking_changes=len(breaking),
        likely_renames=likely_renames,
        type_migrations=type_migrations,
        enum_migrations=enum_migrations,
        boolean_transformations=boolean_transformations,
        field_relocations=field_relocations,
        object_restructures=object_restructures,
        removed_fields=removed_fields,
        safe_additions=safe_additions,
        estimated_effort=estimated,
    )


def build_migration_guide(result: DiffResult, title: str = "APIDrift Migration Guide") -> str:
    lines: list[str] = [
        f"# {title}",
        "",
        f"_Input kind:_ `{result.input_kind.value}`",
        "",
    ]

    executive = result.executive or build_executive_summary(result.changes)
    lines.extend(
        [
            "## API Drift Report",
            "",
            f"**Overall Risk:** `{executive.overall_risk.value.upper()}`",
            "",
            f"- Breaking changes: {executive.breaking_changes}",
            "",
            "### Semantic changes detected",
            "",
            f"- Field renames: {executive.likely_renames}",
            f"- Type migrations: {executive.type_migrations}",
            f"- Enum migrations: {executive.enum_migrations}",
            f"- Boolean transformations: {executive.boolean_transformations}",
            f"- Object restructures: {executive.object_restructures}",
            f"- Field relocations: {executive.field_relocations}",
            f"- Removed fields: {executive.removed_fields}",
            "",
            f"- Safe additions: {executive.safe_additions}",
            "",
            f"**Estimated migration effort:** {executive.estimated_effort}",
            "",
            "## Summary",
            "",
            "| Total | Breaking | Non-breaking | Deprecation |",
            "| ---: | ---: | ---: | ---: |",
            (
                f"| {result.summary.total} | {result.summary.breaking} | "
                f"{result.summary.non_breaking} | {result.summary.deprecation} |"
            ),
            "",
        ]
    )

    if result.warnings:
        lines.append("## Warnings")
        lines.append("")
        for warning in result.warnings:
            lines.append(f"- {warning}")
        lines.append("")

    grouped = {
        ChangeClassification.BREAKING: [],
        ChangeClassification.DEPRECATION: [],
        ChangeClassification.NON_BREAKING: [],
    }
    for change in result.changes:
        grouped[change.classification].append(change)

    for classification, heading in (
        (ChangeClassification.BREAKING, "Breaking changes"),
        (ChangeClassification.DEPRECATION, "Deprecations"),
        (ChangeClassification.NON_BREAKING, "Non-breaking changes"),
    ):
        items = grouped[classification]
        lines.append(f"## {heading}")
        lines.append("")
        if not items:
            lines.append("_None._")
            lines.append("")
            continue
        for item in items:
            path_label = (
                f"{item.from_path} → {item.path}" if item.from_path else item.path
            )
            lines.append(f"### `{item.id}` - {path_label}")
            lines.append("")
            lines.append(f"- **Kind:** `{item.kind.value}`")
            if item.intent:
                lines.append(f"- **Intent:** `{item.intent}`")
            lines.append(f"- **Severity:** `{item.severity.value}`")
            if item.confidence is not None:
                lines.append(f"- **Confidence:** {item.confidence:.0f}%")
            lines.append(f"- **Summary:** {item.summary}")
            if item.reasons:
                lines.append("- **Detected because:**")
                for reason in item.reasons:
                    lines.append(f"  - ✓ {reason}")
            if item.before_value is not None:
                lines.append(f"- **Before:** `{item.before_value!r}`")
            if item.after_value is not None:
                lines.append(f"- **After:** `{item.after_value!r}`")
            if item.mapping:
                lines.append(f"- **Mapping:** `{item.mapping!r}`")
            lines.append("")
            lines.append("**How to fix:** apply the generated migration snippets below.")
            lines.append("")

    if result.snippets:
        lines.append("## Migration snippets")
        lines.append("")
        for snippet in result.snippets:
            lines.append(f"### {snippet.title} (`{snippet.language.value}`)")
            lines.append("")
            lines.append(f"```{snippet.language.value}")
            lines.append(snippet.code)
            lines.append("```")
            lines.append("")

    lines.append("---")
    lines.append("_Generated by APIDrift_")
    lines.append("")
    return "\n".join(lines)

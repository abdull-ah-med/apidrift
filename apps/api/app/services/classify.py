"""Centralized classification rules for structural and correlated changes."""

from __future__ import annotations

from app.schemas.diff import (
    ChangeClassification,
    ChangeItem,
    ChangeKind,
    ChangeSeverity,
)


_BREAKING_KINDS = {
    ChangeKind.REMOVED,
    ChangeKind.RENAMED,
    ChangeKind.RELOCATED,
    ChangeKind.SEMANTIC_TRANSFORM,
    ChangeKind.ENUM_MAPPED,
    ChangeKind.ENUM_NARROWED,
    ChangeKind.REQUIRED_ADDED,
    ChangeKind.NULLABILITY_REMOVED,
    ChangeKind.PATH_REMOVED,
    ChangeKind.OPERATION_REMOVED,
    ChangeKind.RESPONSE_REMOVED,
    ChangeKind.CONSTRAINT_TIGHTENED,
}

_NON_BREAKING_KINDS = {
    ChangeKind.ADDED,
    ChangeKind.ENUM_WIDENED,
    ChangeKind.NULLABILITY_ADDED,
    ChangeKind.PATH_ADDED,
    ChangeKind.OPERATION_ADDED,
    ChangeKind.REQUIRED_REMOVED,
    ChangeKind.VALUE_CHANGED,
}

_DEPRECATION_KINDS = {ChangeKind.DEPRECATED}


def classify_change(change: ChangeItem) -> ChangeItem:
    """Return a copy of change with classification/severity aligned to kind."""
    kind = change.kind

    if kind in _DEPRECATION_KINDS:
        return change.model_copy(
            update={
                "classification": ChangeClassification.DEPRECATION,
                "severity": ChangeSeverity.WARN,
            }
        )

    if kind == ChangeKind.TYPE_CHANGED:
        mapping = change.mapping or {}
        compatible = bool(mapping.get("compatible"))
        if compatible:
            return change.model_copy(
                update={
                    "classification": ChangeClassification.NON_BREAKING,
                    "severity": ChangeSeverity.INFO,
                }
            )
        return change.model_copy(
            update={
                "classification": ChangeClassification.BREAKING,
                "severity": ChangeSeverity.ERR,
            }
        )

    if kind in _BREAKING_KINDS:
        severity = ChangeSeverity.WARN if kind == ChangeKind.REMOVED and "[" in change.path else ChangeSeverity.ERR
        # Array item removals stay WARN; correlated removals are ERR via kind above
        if kind == ChangeKind.REMOVED and change.summary.startswith("Array item"):
            severity = ChangeSeverity.WARN
        return change.model_copy(
            update={
                "classification": ChangeClassification.BREAKING,
                "severity": severity,
            }
        )

    if kind in _NON_BREAKING_KINDS:
        return change.model_copy(
            update={
                "classification": ChangeClassification.NON_BREAKING,
                "severity": ChangeSeverity.INFO,
            }
        )

    # OTHER / unknown: keep existing classification
    return change


def classify_changes(changes: list[ChangeItem]) -> list[ChangeItem]:
    return [classify_change(c) for c in changes]

"""Pydantic schemas for APIDrift diff API."""

from __future__ import annotations

from enum import Enum
from typing import Any, Literal

from pydantic import BaseModel, Field


class InputKind(str, Enum):
    JSON_RESPONSE = "json_response"
    OPENAPI = "openapi"
    AUTO = "auto"


class ChangeClassification(str, Enum):
    BREAKING = "breaking"
    NON_BREAKING = "non_breaking"
    DEPRECATION = "deprecation"


class ChangeSeverity(str, Enum):
    ERR = "ERR"
    WARN = "WARN"
    INFO = "INFO"


class ChangeKind(str, Enum):
    ADDED = "added"
    REMOVED = "removed"
    TYPE_CHANGED = "type_changed"
    VALUE_CHANGED = "value_changed"
    REQUIRED_ADDED = "required_added"
    REQUIRED_REMOVED = "required_removed"
    ENUM_NARROWED = "enum_narrowed"
    ENUM_WIDENED = "enum_widened"
    NULLABILITY_REMOVED = "nullability_removed"
    NULLABILITY_ADDED = "nullability_added"
    DEPRECATED = "deprecated"
    PATH_REMOVED = "path_removed"
    PATH_ADDED = "path_added"
    OPERATION_REMOVED = "operation_removed"
    OPERATION_ADDED = "operation_added"
    RESPONSE_REMOVED = "response_removed"
    CONSTRAINT_TIGHTENED = "constraint_tightened"
    RENAMED = "renamed"
    RELOCATED = "relocated"
    SEMANTIC_TRANSFORM = "semantic_transform"
    ENUM_MAPPED = "enum_mapped"
    OTHER = "other"


class DiffLanguage(str, Enum):
    TYPESCRIPT = "typescript"
    PYTHON = "python"
    CURL = "curl"


class OverallRisk(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class DiffRequest(BaseModel):
    before: str = Field(..., min_length=1, description="Before JSON response or OpenAPI document")
    after: str = Field(..., min_length=1, description="After JSON response or OpenAPI document")
    input_kind: InputKind = InputKind.AUTO
    confidence_threshold: float = Field(
        default=80.0,
        ge=0.0,
        le=100.0,
        description="Minimum confidence (0-100) to auto-merge correlated structural ops",
    )
    languages: list[DiffLanguage] = Field(
        default_factory=lambda: [
            DiffLanguage.TYPESCRIPT,
            DiffLanguage.PYTHON,
            DiffLanguage.CURL,
        ]
    )


class ChangeItem(BaseModel):
    id: str
    path: str
    kind: ChangeKind
    classification: ChangeClassification
    severity: ChangeSeverity
    summary: str
    before_value: Any | None = None
    after_value: Any | None = None
    confidence: float | None = None
    from_path: str | None = None
    mapping: dict[str, Any] | None = None
    related_change_ids: list[str] = Field(default_factory=list)
    intent: str | None = None
    reasons: list[str] = Field(default_factory=list)


class MigrationSnippet(BaseModel):
    language: DiffLanguage
    title: str
    code: str
    related_change_ids: list[str]


class DiffSummary(BaseModel):
    total: int
    breaking: int
    non_breaking: int
    deprecation: int


class ExecutiveSummary(BaseModel):
    overall_risk: OverallRisk
    breaking_changes: int
    likely_renames: int
    type_migrations: int
    enum_migrations: int
    boolean_transformations: int
    field_relocations: int
    object_restructures: int = 0
    removed_fields: int
    safe_additions: int
    estimated_effort: str


class DiffResult(BaseModel):
    input_kind: InputKind
    changes: list[ChangeItem]
    summary: DiffSummary
    snippets: list[MigrationSnippet]
    warnings: list[str] = Field(default_factory=list)
    executive: ExecutiveSummary | None = None


class MigrationGuideRequest(BaseModel):
    result: DiffResult
    title: str = "APIDrift Migration Guide"


class MigrationGuideResponse(BaseModel):
    markdown: str
    content_type: Literal["text/markdown"] = "text/markdown"

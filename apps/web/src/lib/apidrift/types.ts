export type InputKind = "json_response" | "openapi" | "auto";
export type ChangeClassification = "breaking" | "non_breaking" | "deprecation";
export type ChangeSeverity = "ERR" | "WARN" | "INFO";
export type OverallRisk = "high" | "medium" | "low";

export type ChangeKind =
  | "added"
  | "removed"
  | "type_changed"
  | "value_changed"
  | "required_added"
  | "required_removed"
  | "enum_narrowed"
  | "enum_widened"
  | "nullability_removed"
  | "nullability_added"
  | "deprecated"
  | "path_removed"
  | "path_added"
  | "operation_removed"
  | "operation_added"
  | "response_removed"
  | "constraint_tightened"
  | "renamed"
  | "relocated"
  | "semantic_transform"
  | "enum_mapped"
  | "other";

export type DiffLanguage = "typescript" | "python" | "curl";

export interface ChangeItem {
  id: string;
  path: string;
  kind: ChangeKind;
  classification: ChangeClassification;
  severity: ChangeSeverity;
  summary: string;
  before_value?: unknown;
  after_value?: unknown;
  confidence?: number | null;
  from_path?: string | null;
  mapping?: Record<string, unknown> | null;
  related_change_ids?: string[];
  intent?: string | null;
  reasons?: string[];
}

export interface MigrationSnippet {
  language: DiffLanguage;
  title: string;
  code: string;
  related_change_ids: string[];
}

export interface DiffSummary {
  total: number;
  breaking: number;
  non_breaking: number;
  deprecation: number;
}

export interface ExecutiveSummary {
  overall_risk: OverallRisk;
  breaking_changes: number;
  likely_renames: number;
  type_migrations: number;
  enum_migrations: number;
  boolean_transformations: number;
  field_relocations: number;
  object_restructures: number;
  removed_fields: number;
  safe_additions: number;
  estimated_effort: string;
}

export interface DiffResult {
  input_kind: InputKind;
  changes: ChangeItem[];
  summary: DiffSummary;
  snippets: MigrationSnippet[];
  warnings: string[];
  executive?: ExecutiveSummary | null;
}

export interface DiffRequest {
  before: string;
  after: string;
  input_kind?: InputKind;
  confidence_threshold?: number;
  languages?: DiffLanguage[];
}

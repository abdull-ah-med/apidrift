export type InputKind = "json_response" | "openapi" | "auto";
export type ChangeClassification = "breaking" | "non_breaking" | "deprecation";
export type ChangeSeverity = "ERR" | "WARN" | "INFO";

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

export interface DiffResult {
  input_kind: InputKind;
  changes: ChangeItem[];
  summary: DiffSummary;
  snippets: MigrationSnippet[];
  warnings: string[];
}

export interface DiffRequest {
  before: string;
  after: string;
  input_kind?: InputKind;
  languages?: DiffLanguage[];
}

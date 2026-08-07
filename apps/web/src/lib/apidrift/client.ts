import type { DiffRequest, DiffResult } from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function runDiff(request: DiffRequest): Promise<DiffResult> {
  const res = await fetch("/backend/v1/diff", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = (await res.json()) as { detail?: string };
      if (body.detail) detail = body.detail;
    } catch {
      /* ignore */
    }
    throw new ApiError(detail, res.status);
  }
  return res.json() as Promise<DiffResult>;
}

export async function exportMigrationGuide(
  result: DiffResult,
  title = "APIDrift Migration Guide",
): Promise<string> {
  const res = await fetch("/backend/v1/migration-guide", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ result, title }),
  });
  if (!res.ok) {
    throw new ApiError(res.statusText, res.status);
  }
  const body = (await res.json()) as { markdown: string };
  return body.markdown;
}

export function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductTour } from "@/lib/product-tour";
import { ChangeResults } from "@/components/workspace/change-results";
import { DiffAssistantPanel } from "@/components/workspace/diff-assistant-panel";
import {
  DiffResultProvider,
  useDiffResult,
} from "@/components/workspace/diff-result-context";
import {
  downloadMarkdown,
  exportMigrationGuide,
  runDiff,
} from "@/lib/apidrift/client";
import type { InputKind } from "@/lib/apidrift/types";
import {
  EXAMPLE_JSON_AFTER,
  EXAMPLE_JSON_BEFORE,
  EXAMPLE_OPENAPI_AFTER,
  EXAMPLE_OPENAPI_BEFORE,
} from "@/lib/apidrift/examples";

function DiffWorkspaceInner() {
  const { result, setResult } = useDiffResult();
  const [before, setBefore] = useState(EXAMPLE_JSON_BEFORE);
  const [after, setAfter] = useState(EXAMPLE_JSON_AFTER);
  const [inputKind, setInputKind] = useState<InputKind>("auto");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onRun = useCallback(async () => {
    setError(null);
    setPending(true);
    try {
      const next = await runDiff({ before, after, input_kind: inputKind });
      setResult(next);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Diff failed");
    } finally {
      setPending(false);
    }
  }, [after, before, inputKind, setResult]);

  const onExport = useCallback(async () => {
    if (!result) return;
    setError(null);
    try {
      const markdown = await exportMigrationGuide(result);
      downloadMarkdown("apidrift-migration-guide.md", markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    }
  }, [result]);

  const loadJsonExample = () => {
    setBefore(EXAMPLE_JSON_BEFORE);
    setAfter(EXAMPLE_JSON_AFTER);
    setInputKind("json_response");
  };

  const loadOpenApiExample = () => {
    setBefore(EXAMPLE_OPENAPI_BEFORE);
    setAfter(EXAMPLE_OPENAPI_AFTER);
    setInputKind("openapi");
  };

  return (
    <main className="mx-auto min-h-svh max-w-6xl px-6 py-10">
      <ProductTour />
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase"
          >
            APIDrift
          </Link>
          <h1 className="mt-2 text-2xl font-semibold">Diff workspace</h1>
          <p className="mt-1 max-w-xl text-muted-foreground">
            Paste before/after JSON responses or OpenAPI specs. Classify changes and
            export a Migration Guide.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={loadJsonExample}>
            Load JSON example
          </Button>
          <Button variant="outline" size="sm" onClick={loadOpenApiExample}>
            Load OpenAPI example
          </Button>
          <Button
            id="tour-export"
            variant="outline"
            onClick={onExport}
            disabled={!result}
          >
            Export Migration Guide
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div className="space-y-2">
          <Label>Input kind</Label>
          <Select
            value={inputKind}
            onValueChange={(v) => setInputKind(v as InputKind)}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto-detect</SelectItem>
              <SelectItem value="json_response">JSON response</SelectItem>
              <SelectItem value="openapi">OpenAPI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button id="tour-run" onClick={onRun} disabled={pending}>
          {pending ? "Running…" : "Run semantic diff"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="before">Before</Label>
          <Textarea
            id="tour-before"
            value={before}
            onChange={(e) => setBefore(e.target.value)}
            className="min-h-72 font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="after">After</Label>
          <Textarea
            id="tour-after"
            value={after}
            onChange={(e) => setAfter(e.target.value)}
            className="min-h-72 font-mono text-sm"
            spellCheck={false}
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          {result ? (
            <ChangeResults result={result} />
          ) : (
            <div
              id="tour-results"
              className="rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground"
            >
              Results will appear here after you run a diff.
            </div>
          )}
        </section>
        <DiffAssistantPanel />
      </div>
    </main>
  );
}

export function DiffWorkspace() {
  return (
    <DiffResultProvider>
      <DiffWorkspaceInner />
    </DiffResultProvider>
  );
}

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
import { Download, Play, FileJson, FileCode2 } from "lucide-react";

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
    <div className="flex min-h-svh flex-col">
      <ProductTour />

      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="shrink-0 font-mono text-xs tracking-[0.22em] text-accent-signal uppercase"
          >
            APIDrift
          </Link>
          <div className="hidden h-4 w-px bg-border sm:block" />
          <p className="hidden text-sm text-muted-foreground sm:block">
            Diff workspace
          </p>

          <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
            <Select
              value={inputKind}
              onValueChange={(v) => setInputKind(v as InputKind)}
            >
              <SelectTrigger className="h-8 w-[150px] border-border bg-card text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="json_response">JSON response</SelectItem>
                <SelectItem value="openapi">OpenAPI</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground"
              onClick={loadJsonExample}
            >
              <FileJson className="size-3.5" />
              JSON
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground"
              onClick={loadOpenApiExample}
            >
              <FileCode2 className="size-3.5" />
              OpenAPI
            </Button>
            <Button
              id="tour-export"
              variant="outline"
              size="sm"
              className="h-8 border-border text-xs"
              onClick={onExport}
              disabled={!result}
            >
              <Download className="size-3.5" />
              Export
            </Button>
            <Button
              id="tour-run"
              size="sm"
              className="h-8 bg-accent-signal text-primary-foreground hover:bg-accent-signal/90"
              onClick={onRun}
              disabled={pending}
            >
              <Play className="size-3.5" />
              {pending ? "Running…" : "Run diff"}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-0 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:grid-rows-[minmax(280px,38vh)_minmax(0,1fr)]">
        {/* Editors */}
        <section className="grid border-b border-border md:grid-cols-2 lg:col-span-1 lg:row-span-1 lg:border-r lg:border-b-0">
          <div className="flex min-h-[240px] flex-col border-b border-border md:border-r md:border-b-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <Label htmlFor="tour-before" className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                Before
              </Label>
            </div>
            <Textarea
              id="tour-before"
              value={before}
              onChange={(e) => setBefore(e.target.value)}
              className="min-h-0 flex-1 resize-none rounded-none border-0 bg-panel font-mono text-[13px] leading-relaxed shadow-none focus-visible:ring-0"
              spellCheck={false}
            />
          </div>
          <div className="flex min-h-[240px] flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <Label htmlFor="tour-after" className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                After
              </Label>
            </div>
            <Textarea
              id="tour-after"
              value={after}
              onChange={(e) => setAfter(e.target.value)}
              className="min-h-0 flex-1 resize-none rounded-none border-0 bg-panel font-mono text-[13px] leading-relaxed shadow-none focus-visible:ring-0"
              spellCheck={false}
            />
          </div>
        </section>

        {/* Assistant — right column on large screens */}
        <aside className="order-3 flex min-h-[420px] flex-col border-t border-border lg:order-none lg:col-start-2 lg:row-span-2 lg:min-h-0 lg:border-t-0">
          <DiffAssistantPanel />
        </aside>

        {/* Results */}
        <section className="order-2 flex min-h-[360px] flex-col border-t border-border lg:order-none lg:col-start-1 lg:row-start-2 lg:min-h-0 lg:border-r lg:border-t">
          {error && (
            <p className="border-b border-danger/30 bg-danger/10 px-4 py-2 text-sm text-danger">
              {error}
            </p>
          )}
          <div className="min-h-0 flex-1 overflow-hidden p-4">
            {result ? (
              <ChangeResults result={result} />
            ) : (
              <div
                id="tour-results"
                className="flex h-full min-h-[280px] items-center justify-center border border-dashed border-border bg-card/40 px-6 text-center text-sm text-muted-foreground"
              >
                Run a diff to see classified changes and migration snippets.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export function DiffWorkspace() {
  return (
    <DiffResultProvider>
      <DiffWorkspaceInner />
    </DiffResultProvider>
  );
}

"use client";

import { useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";
import type {
  ChangeClassification,
  ChangeItem,
  DiffResult,
  ExecutiveSummary,
  OverallRisk,
} from "@/lib/apidrift/types";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const FILTERS: Array<{ id: "all" | ChangeClassification; label: string }> = [
  { id: "all", label: "All" },
  { id: "breaking", label: "Breaking" },
  { id: "non_breaking", label: "Non-breaking" },
  { id: "deprecation", label: "Deprecation" },
];

const SNIPPET_MIN_H = 112;
const SNIPPET_DEFAULT_H = 160;
const SNIPPET_MAX_H = 640;

function severityClass(classification: ChangeClassification) {
  switch (classification) {
    case "breaking":
      return "border-danger/40 bg-danger/10 text-danger";
    case "deprecation":
      return "border-warn/40 bg-warn/10 text-warn";
    default:
      return "border-ok/40 bg-ok/10 text-ok";
  }
}

function riskClass(risk: OverallRisk) {
  switch (risk) {
    case "high":
      return "border-danger/40 bg-danger/10 text-danger";
    case "medium":
      return "border-warn/40 bg-warn/10 text-warn";
    default:
      return "border-ok/40 bg-ok/10 text-ok";
  }
}

export function ChangeResults({ result }: { result: DiffResult }) {
  const [filter, setFilter] = useState<"all" | ChangeClassification>("all");
  const [snippetHeight, setSnippetHeight] = useState(SNIPPET_DEFAULT_H);

  const filtered = useMemo(() => {
    if (filter === "all") return result.changes;
    return result.changes.filter((c) => c.classification === filter);
  }, [filter, result.changes]);

  const onResizeSnippet = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const startY = event.clientY;
    const startH = snippetHeight;
    const target = event.currentTarget;
    target.setPointerCapture(event.pointerId);

    const onMove = (moveEvent: PointerEvent) => {
      const next = Math.min(
        SNIPPET_MAX_H,
        Math.max(SNIPPET_MIN_H, startH + (moveEvent.clientY - startY)),
      );
      setSnippetHeight(next);
    };
    const onUp = (upEvent: PointerEvent) => {
      target.releasePointerCapture(upEvent.pointerId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div id="tour-results" className="flex flex-col gap-3">
      {result.executive ? <ExecutiveStrip executive={result.executive} /> : null}

      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Results
        </span>
        <Badge variant="secondary" className="rounded-md font-mono text-[10px]">
          {result.summary.total}
        </Badge>
        <Badge className={cn("rounded-md font-mono text-[10px]", severityClass("breaking"))}>
          {result.summary.breaking} breaking
        </Badge>
        <Badge className={cn("rounded-md font-mono text-[10px]", severityClass("non_breaking"))}>
          {result.summary.non_breaking} safe
        </Badge>
        <Badge className={cn("rounded-md font-mono text-[10px]", severityClass("deprecation"))}>
          {result.summary.deprecation} deprecated
        </Badge>
        <Badge variant="outline" className="ml-auto rounded-md font-mono text-[10px] text-muted-foreground">
          {result.input_kind}
        </Badge>
      </div>

      {result.warnings.length > 0 && (
        <ul className="space-y-1 border border-warn/25 bg-warn/5 px-3 py-2 text-xs text-warn">
          {result.warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide transition",
              filter === f.id
                ? "border-accent-signal/50 bg-accent-signal/10 text-accent-signal"
                : "border-border text-muted-foreground hover:border-border hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-border bg-card/50">
        <ul className="divide-y divide-border">
          {filtered.length === 0 && (
            <li className="p-5 text-sm text-muted-foreground">No changes in this filter.</li>
          )}
          {filtered.map((change) => (
            <ChangeRow key={change.id} change={change} />
          ))}
        </ul>
      </div>

      {result.snippets.length > 0 && (
        <Tabs defaultValue={result.snippets[0]?.language} className="shrink-0">
          <TabsList className="h-8 bg-muted/60">
            {result.snippets.map((s) => (
              <TabsTrigger key={s.language} value={s.language} className="text-xs">
                {s.language}
              </TabsTrigger>
            ))}
          </TabsList>
          {result.snippets.map((s) => (
            <TabsContent key={s.language} value={s.language} className="mt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">{s.title}</p>
                  <button
                    type="button"
                    className="font-mono text-[11px] text-accent-signal underline-offset-2 hover:underline"
                    onClick={() => navigator.clipboard.writeText(s.code)}
                  >
                    Copy
                  </button>
                </div>
                <div className="overflow-hidden rounded-md border border-border bg-panel">
                  <pre
                    style={{ height: snippetHeight }}
                    className="overflow-auto overscroll-contain p-3 font-mono text-[12px] leading-relaxed text-foreground/90"
                  >
                    {s.code}
                  </pre>
                  <div
                    role="separator"
                    aria-orientation="horizontal"
                    aria-label="Resize client adaptations"
                    aria-valuemin={SNIPPET_MIN_H}
                    aria-valuemax={SNIPPET_MAX_H}
                    aria-valuenow={snippetHeight}
                    tabIndex={0}
                    onPointerDown={onResizeSnippet}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setSnippetHeight((h) => Math.max(SNIPPET_MIN_H, h - 24));
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setSnippetHeight((h) => Math.min(SNIPPET_MAX_H, h + 24));
                      }
                    }}
                    className="flex h-3 cursor-ns-resize items-center justify-center border-t border-border bg-muted/40 hover:bg-muted/70"
                  >
                    <span className="h-0.5 w-8 rounded-full bg-border" />
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

function ExecutiveStrip({ executive }: { executive: ExecutiveSummary }) {
  return (
    <div className="rounded-md border border-border bg-panel/80 px-3 py-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          API Drift Report
        </span>
        <Badge className={cn("rounded-md font-mono text-[10px] uppercase", riskClass(executive.overall_risk))}>
          Risk {executive.overall_risk}
        </Badge>
        <span className="text-xs text-muted-foreground">{executive.estimated_effort}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
        <span>{executive.likely_renames} renames</span>
        <span>{executive.type_migrations} type migrations</span>
        <span>{executive.enum_migrations} enum migrations</span>
        <span>{executive.boolean_transformations} boolean transforms</span>
        <span>{executive.object_restructures} object restructures</span>
        <span>{executive.field_relocations} relocations</span>
        <span>{executive.removed_fields} removed</span>
        <span>{executive.safe_additions} safe additions</span>
      </div>
    </div>
  );
}

function ChangeRow({ change }: { change: ChangeItem }) {
  const pathLabel = change.from_path ? `${change.from_path} → ${change.path}` : change.path;
  const mappingPreview =
    change.mapping &&
    Object.entries(change.mapping)
      .filter(([k]) => !["compatible", "from_parent", "to_parent", "kind", "before_type", "after_type"].includes(k))
      .slice(0, 4)
      .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
      .join(", ");

  return (
    <li className="px-3 py-3 transition hover:bg-muted/40">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={cn("rounded-md font-mono text-[10px]", severityClass(change.classification))}>
          {change.classification.replace("_", "-")}
        </Badge>
        <Badge variant="outline" className="rounded-md font-mono text-[10px] text-muted-foreground">
          {change.kind.replace(/_/g, "-")}
        </Badge>
        <Badge variant="outline" className="rounded-md font-mono text-[10px] text-muted-foreground">
          {change.severity}
        </Badge>
        {change.intent ? (
          <Badge variant="secondary" className="rounded-md font-mono text-[10px]">
            {change.intent}
          </Badge>
        ) : null}
        {change.confidence != null ? (
          <Badge variant="secondary" className="rounded-md font-mono text-[10px] text-accent-signal">
            {Math.round(change.confidence)}%
          </Badge>
        ) : null}
        <span className="font-mono text-[10px] text-muted-foreground">{change.id}</span>
      </div>
      <p className="mt-1.5 font-mono text-[13px] text-foreground">{pathLabel}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{change.summary}</p>
      {change.reasons && change.reasons.length > 0 ? (
        <ul className="mt-1.5 space-y-0.5 text-[11px] text-muted-foreground/90">
          {change.reasons.map((reason) => (
            <li key={reason}>✓ {reason}</li>
          ))}
        </ul>
      ) : null}
      {mappingPreview ? (
        <p className="mt-1 font-mono text-[11px] text-muted-foreground/90">{mappingPreview}</p>
      ) : null}
    </li>
  );
}

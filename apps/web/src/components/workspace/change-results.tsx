"use client";

import { useMemo, useState } from "react";
import type { ChangeClassification, ChangeItem, DiffResult } from "@/lib/apidrift/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const FILTERS: Array<{ id: "all" | ChangeClassification; label: string }> = [
  { id: "all", label: "All" },
  { id: "breaking", label: "Breaking" },
  { id: "non_breaking", label: "Non-breaking" },
  { id: "deprecation", label: "Deprecation" },
];

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

export function ChangeResults({ result }: { result: DiffResult }) {
  const [filter, setFilter] = useState<"all" | ChangeClassification>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return result.changes;
    return result.changes.filter((c) => c.classification === filter);
  }, [filter, result.changes]);

  return (
    <div id="tour-results" className="flex h-full min-h-0 flex-col gap-3">
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

      <ScrollArea className="min-h-0 flex-1 rounded-md border border-border bg-card/50">
        <ul className="divide-y divide-border">
          {filtered.length === 0 && (
            <li className="p-5 text-sm text-muted-foreground">No changes in this filter.</li>
          )}
          {filtered.map((change) => (
            <ChangeRow key={change.id} change={change} />
          ))}
        </ul>
      </ScrollArea>

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
                <pre className="max-h-40 overflow-auto rounded-md border border-border bg-panel p-3 font-mono text-[12px] leading-relaxed text-foreground/90">
                  {s.code}
                </pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

function ChangeRow({ change }: { change: ChangeItem }) {
  return (
    <li className="px-3 py-3 transition hover:bg-muted/40">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={cn("rounded-md font-mono text-[10px]", severityClass(change.classification))}>
          {change.classification.replace("_", "-")}
        </Badge>
        <Badge variant="outline" className="rounded-md font-mono text-[10px] text-muted-foreground">
          {change.severity}
        </Badge>
        <span className="font-mono text-[10px] text-muted-foreground">{change.id}</span>
      </div>
      <p className="mt-1.5 font-mono text-[13px] text-foreground">{change.path}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{change.summary}</p>
    </li>
  );
}

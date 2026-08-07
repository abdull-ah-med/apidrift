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
      return "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300";
    case "deprecation":
      return "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200";
    default:
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200";
  }
}

export function ChangeResults({ result }: { result: DiffResult }) {
  const [filter, setFilter] = useState<"all" | ChangeClassification>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return result.changes;
    return result.changes.filter((c) => c.classification === filter);
  }, [filter, result.changes]);

  return (
    <div id="tour-results" className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">Total {result.summary.total}</Badge>
        <Badge className={severityClass("breaking")}>
          Breaking {result.summary.breaking}
        </Badge>
        <Badge className={severityClass("non_breaking")}>
          Non-breaking {result.summary.non_breaking}
        </Badge>
        <Badge className={severityClass("deprecation")}>
          Deprecation {result.summary.deprecation}
        </Badge>
        <Badge variant="outline">Mode {result.input_kind}</Badge>
      </div>

      {result.warnings.length > 0 && (
        <ul className="space-y-1 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-900 dark:text-amber-100">
          {result.warnings.map((w) => (
            <li key={w}>⚠ {w}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition",
              filter === f.id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ScrollArea className="h-[320px] rounded-xl border border-border">
        <ul className="divide-y divide-border">
          {filtered.length === 0 && (
            <li className="p-6 text-sm text-muted-foreground">No changes in this filter.</li>
          )}
          {filtered.map((change) => (
            <ChangeRow key={change.id} change={change} />
          ))}
        </ul>
      </ScrollArea>

      {result.snippets.length > 0 && (
        <Tabs defaultValue={result.snippets[0]?.language}>
          <TabsList>
            {result.snippets.map((s) => (
              <TabsTrigger key={s.language} value={s.language}>
                {s.language}
              </TabsTrigger>
            ))}
          </TabsList>
          {result.snippets.map((s) => (
            <TabsContent key={s.language} value={s.language}>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{s.title}</p>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                    onClick={() => navigator.clipboard.writeText(s.code)}
                  >
                    Copy
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed">
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
    <li className="p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={severityClass(change.classification)}>
          {change.classification.replace("_", "-")}
        </Badge>
        <Badge variant="outline">{change.severity}</Badge>
        <span className="font-mono text-xs text-muted-foreground">{change.id}</span>
      </div>
      <p className="mt-2 font-mono text-sm">{change.path}</p>
      <p className="mt-1 text-sm text-muted-foreground">{change.summary}</p>
    </li>
  );
}

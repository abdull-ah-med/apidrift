"use client";

import { ProductTour } from "@/lib/product-tour";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AppPage() {
  return (
    <main className="mx-auto min-h-svh max-w-6xl px-6 py-10">
      <ProductTour />
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase"
          >
            APIDrift
          </Link>
          <h1 className="mt-2 text-2xl font-semibold">Diff workspace</h1>
          <p className="mt-1 text-muted-foreground">
            Paste before/after payloads. Classifier wiring lands next.
          </p>
        </div>
        <Button id="tour-export" variant="outline" disabled>
          Export Migration Guide
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="before">Before</Label>
          <Textarea
            id="tour-before"
            className="min-h-64 font-mono text-sm"
            placeholder='{"id": 1, "email": "a@example.com"}'
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="after">After</Label>
          <Textarea
            id="tour-after"
            className="min-h-64 font-mono text-sm"
            placeholder='{"id": "1"}'
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button id="tour-run" disabled>
          Run semantic diff
        </Button>
      </div>

      <section
        id="tour-results"
        className="mt-10 rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground"
      >
        Results will appear here after the backend classifier is connected.
      </section>
    </main>
  );
}

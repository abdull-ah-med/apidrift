"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export default function CallToAction() {
  return (
    <section className="pb-28 pt-8">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="material-sheet rounded-[1.5rem] border border-white/10 px-8 py-14 text-center sm:px-12">
            <h2 className="type-title mx-auto max-w-2xl text-[clamp(1.75rem,3.5vw,2.35rem)] text-foreground">
              Catch contract drift before your clients do
            </h2>
            <p className="type-body mx-auto mt-4 max-w-lg text-[17px] text-muted-foreground">
              Paste a before/after payload and get a migration-ready report in
              seconds.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/app">Open workspace</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/app">Try with examples</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

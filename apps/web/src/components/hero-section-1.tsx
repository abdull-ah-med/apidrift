"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { HeroDiffSheet } from "@/components/hero-diff-sheet";

export default function HeroSection() {
  return (
    <main className="overflow-hidden">
      <section className="relative min-h-[92svh]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgb(10_132_255_/_0.16),transparent_70%)]" />

        <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-5xl flex-col justify-center px-6 pb-12 pt-24">
          <Reveal>
            <p className="type-title text-[clamp(2.5rem,7vw,5rem)] text-foreground">
              APIDrift
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="type-display mt-3 max-w-3xl text-[clamp(1.6rem,3.8vw,2.5rem)] text-foreground">
              See contract changes before clients do
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="type-body mt-4 max-w-xl text-[17px] text-muted-foreground sm:text-lg">
              Paste two API responses or OpenAPI specs. Get Breaking,
              Non-Breaking, and Deprecation calls, plus migration snippets and a
              guide you can ship.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="pr-4">
              <Link href="/app">
                <span className="text-nowrap">Open workspace</span>
                <ChevronRight className="opacity-60" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#how-it-works">
                <span className="text-nowrap">How it works</span>
              </Link>
            </Button>
          </Reveal>

          <div className="mt-12 sm:mt-14">
            <HeroDiffSheet />
          </div>
        </div>
      </section>
    </main>
  );
}

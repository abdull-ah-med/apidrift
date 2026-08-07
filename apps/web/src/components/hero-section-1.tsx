"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/header";
import { ChevronRight } from "lucide-react";
import Aurora from "@/components/Aurora";
import BlurText from "@/components/BlurText";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section className="relative min-h-[92svh] bg-background">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <Aurora
              colorStops={["#0B3D3A", "#2BC8B7", "#0E1A2B"]}
              amplitude={0.85}
              blend={0.55}
              speed={0.6}
            />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-5xl flex-col justify-center px-6 py-28">
            <p className="mb-4 font-mono text-xs tracking-[0.28em] text-teal-700 uppercase dark:text-teal-300">
              APIDrift
            </p>
            <BlurText
              text="Semantic API contract change detection"
              className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-foreground md:text-6xl"
              animateBy="words"
              direction="top"
              delay={80}
            />
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground text-balance">
              Paste two API responses or OpenAPI specs. Get a classified semantic
              diff — Breaking, Non-Breaking, Deprecation — plus migration snippets
              and a one-click Migration Guide.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="pr-4.5">
                <Link href="/app">
                  <span className="text-nowrap">Open workspace</span>
                  <ChevronRight className="opacity-50" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#how-it-works">
                  <span className="text-nowrap">How it works</span>
                </Link>
              </Button>
            </div>
            <pre className="mt-14 max-w-xl overflow-hidden rounded-xl border border-border bg-card/80 p-4 font-mono text-xs leading-relaxed text-muted-foreground shadow-sm backdrop-blur">
              {`+ removed  response.body.user.email
~ type     response.body.id  number → string
! deprecated  /v1/users  sunset: 2026-12-01`}
            </pre>
          </div>
        </section>
      </main>
    </>
  );
}

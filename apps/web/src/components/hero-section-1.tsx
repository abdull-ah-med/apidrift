"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export default function HeroSection() {
  return (
    <main className="overflow-hidden">
      <section className="relative pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgb(10_132_255/0.16),transparent_70%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <h1 className="sr-only">
            APIDrift — See contract changes before clients do
          </h1>

          <Reveal>
            <div className="overflow-hidden rounded-[1.25rem] border border-white/10 shadow-[0_24px_80px_rgb(0_0_0/0.45)]">
              <Image
                src="/hero.png"
                alt="APIDrift: paste two API responses or OpenAPI specs, get Breaking, Non-Breaking, and Deprecation calls with migration snippets"
                width={3840}
                height={2300}
                priority
                className="h-auto w-full"
                sizes="(max-width: 1152px) 100vw, 1152px"
              />
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
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
        </div>
      </section>
    </main>
  );
}

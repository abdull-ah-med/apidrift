"use client";

import { Reveal } from "@/components/motion/reveal";

const features = [
  {
    title: "Structural and semantic diff",
    body: "Compare JSON responses or OpenAPI specs beyond line-by-line text. Paths, types, enums, and nullability are first-class.",
  },
  {
    title: "Breaking change classification",
    body: "Every change is tagged Breaking, Non-Breaking, or Deprecation, aligned with established OpenAPI change-review practice.",
  },
  {
    title: "Migration snippets",
    body: "Deterministic TypeScript, Python, and curl snippets for each breaking change so clients know how to adapt.",
  },
  {
    title: "Migration Guide export",
    body: "One click produces a clean markdown guide you can drop into a PR or release notes.",
  },
];

export default function Features() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <p className="type-caption text-[13px] font-medium text-primary">
            How it works
          </p>
          <h2 className="type-title mt-3 max-w-2xl text-[clamp(1.75rem,3.5vw,2.5rem)] text-foreground">
            Diffs that speak contract language
          </h2>
          <p className="type-body mt-4 max-w-2xl text-[17px] text-muted-foreground">
            Most tools stop at “field X was removed.” APIDrift tells you whether
            that removal breaks clients, and how to migrate.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-hairline border-y border-hairline">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={0.04 * index}>
              <div className="grid gap-3 py-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-10">
                <h3 className="type-title text-[19px] text-foreground">
                  {feature.title}
                </h3>
                <p className="type-body text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
                  {feature.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

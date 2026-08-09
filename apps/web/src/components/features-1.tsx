"use client";

import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    step: "1",
    title: "Paste before and after",
    body: "Drop two API responses or OpenAPI specs into the workspace. Auto-detect works when you are not sure which format you have.",
  },
  {
    step: "2",
    title: "Run the semantic diff",
    body: "APIDrift correlates removes and adds into renames, relocations, type migrations, and object restructures, then classifies each change Breaking, Non-Breaking, or Deprecation.",
  },
  {
    step: "3",
    title: "Take the adapters",
    body: "Get deterministic TypeScript, Python, and curl snippets shaped like the new contract so clients know how to adapt.",
  },
  {
    step: "4",
    title: "Export the Migration Guide",
    body: "Download a markdown guide with risk, confidence, reasons, and before/after samples you can drop into a PR or release notes.",
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
            Four steps from paste to migration guide
          </h2>
          <p className="type-body mt-4 max-w-2xl text-[17px] text-muted-foreground">
            Most tools stop at “field X was removed.” APIDrift tells you whether
            that removal breaks clients, and how to migrate.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-hairline border-y border-hairline">
          {steps.map((item, index) => (
            <Reveal key={item.title} delay={0.04 * index}>
              <div className="grid gap-3 py-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-10">
                <h3 className="type-title text-[19px] text-foreground">
                  <span className="mr-3 text-primary">{item.step}.</span>
                  {item.title}
                </h3>
                <p className="type-body text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

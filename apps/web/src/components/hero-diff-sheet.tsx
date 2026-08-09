"use client";

import { motion, useReducedMotion } from "motion/react";
import { springQuiet } from "@/components/motion/reveal";

const rows = [
  {
    kind: "removed",
    mark: "−",
    path: "response.body.user.email",
    tone: "text-danger",
    chip: "Breaking",
    chipClass: "bg-danger/10 text-danger",
  },
  {
    kind: "type",
    mark: "~",
    path: "response.body.id  number → string",
    tone: "text-warn",
    chip: "Breaking",
    chipClass: "bg-danger/10 text-danger",
  },
  {
    kind: "deprecated",
    mark: "!",
    path: "/v1/users  sunset: 2026-12-01",
    tone: "text-muted-foreground",
    chip: "Deprecation",
    chipClass: "bg-warn/15 text-warn",
  },
] as const;

/**
 * Product visual: a translucent material sheet that materializes
 * (scale + opacity together), not a plain opacity fade.
 */
export function HeroDiffSheet() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="material-sheet relative mx-auto w-full max-w-3xl overflow-hidden rounded-[1.25rem] border border-white/10"
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: 20, scale: 0.97 }
      }
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={reduce ? { duration: 0.2 } : { ...springQuiet, delay: 0.22 }}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
        <span className="type-caption ml-3 text-xs text-muted-foreground">
          Contract diff
        </span>
        <span className="type-caption ml-auto rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary">
          3 changes
        </span>
      </div>
      <ul className="divide-y divide-hairline">
        {rows.map((row, i) => (
          <motion.li
            key={row.path}
            className="flex items-start gap-3 px-4 py-3.5 sm:items-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              reduce
                ? { duration: 0.15, delay: 0.1 + i * 0.05 }
                : { ...springQuiet, delay: 0.42 + i * 0.08 }
            }
          >
            <span
              className={`font-mono text-sm font-medium ${row.tone}`}
              aria-hidden
            >
              {row.mark}
            </span>
            <code className="min-w-0 flex-1 font-mono text-[12px] leading-relaxed text-foreground/85 sm:text-[13px]">
              {row.path}
            </code>
            <span
              className={`type-caption shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${row.chipClass}`}
            >
              {row.chip}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

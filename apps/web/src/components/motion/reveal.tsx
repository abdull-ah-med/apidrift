"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

/** Critically damped spring: Apple default for non-momentum UI. */
export const springQuiet = { type: "spring" as const, bounce: 0, duration: 0.4 };

/** Slight bounce only for momentum-driven settles. */
export const springMomentum = { type: "spring" as const, bounce: 0.2, duration: 0.35 };

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Interruptible spring reveal from current presentation values.
 * Reduced motion: short opacity cross-fade, no travel.
 * No blur on text reveals (blur is reserved for material sheets).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 12,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay, ease: "easeOut" }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springQuiet, delay }}
      style={{ willChange: "transform, opacity" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

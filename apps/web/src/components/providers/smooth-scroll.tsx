"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/** Smooth scroll for marketing pages only. Workspace tools use native scroll. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const enableLenis = pathname === "/" || pathname === "";
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!enableLenis || reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        duration: 1.05,
        smoothWheel: true,
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

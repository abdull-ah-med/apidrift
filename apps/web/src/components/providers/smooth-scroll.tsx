"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Smooth scroll for marketing pages only. Workspace tools use native scroll. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const enableLenis = pathname === "/" || pathname === "";

  if (!enableLenis) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

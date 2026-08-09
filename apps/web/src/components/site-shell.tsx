import type { ReactNode } from "react";
import { SiteHeader } from "@/components/header";
import Footer from "@/components/footer-1";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="pt-[3.25rem]">{children}</div>
      <Footer />
    </>
  );
}

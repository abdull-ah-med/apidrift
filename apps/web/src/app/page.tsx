import HeroSection from "@/components/hero-section-1";
import Features from "@/components/features-1";
import CallToAction from "@/components/call-to-action-1";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <Features />
      <CallToAction />
    </SiteShell>
  );
}

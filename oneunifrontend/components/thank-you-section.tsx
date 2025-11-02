"use client"

import { THANK_YOU } from "@/lib/content/landing-content"
import { CheckCircle2 } from "lucide-react"

interface ThankYouSectionProps {
  onReset: () => void
}

export function ThankYouSection({ onReset }: ThankYouSectionProps) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle2 size={64} style={{ color: "var(--brand-yellow)" }} />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
          {THANK_YOU.title}
        </h2>

        <p className="text-xl text-muted-foreground mb-4">{THANK_YOU.subtitle}</p>

        <p className="text-lg text-muted-foreground mb-8">{THANK_YOU.message}</p>

        <button
          onClick={onReset}
          className="cursor-pointer px-8 py-4 rounded-full font-semibold transition hover:shadow-minimal-hover text-white"
          style={{ backgroundColor: "var(--brand-blue)" }}
        >
          {THANK_YOU.cta}
        </button>
      </div>
    </section>
  )
}

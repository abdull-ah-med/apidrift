"use client"

import { CTA as CTA_CONTENT } from "@/lib/content/landing-content"

export default function CTA() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ color: "var(--brand-blue)" }}>
          {CTA_CONTENT.title}
        </h2>
        <p className="text-xl text-muted-foreground mb-8">{CTA_CONTENT.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 rounded-full font-semibold transition hover:shadow-minimal-hover text-white" style={{ backgroundColor: "var(--brand-blue)" }}>
            {CTA_CONTENT.primary}
          </button>
          <button className="px-8 py-4 rounded-full font-semibold transition hover:bg-muted" style={{ borderColor: "var(--brand-blue)", color: "var(--brand-blue)" }}>
            {CTA_CONTENT.secondary}
          </button>
        </div>
      </div>
    </section>
  )
}

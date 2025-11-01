"use client"

import { GraduationCap } from "lucide-react"
import { HERO } from "@/lib/content/landing-content"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-32 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-foreground" style={{ color: "var(--brand-blue)" }}>
              {HERO.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{HERO.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 rounded-full font-semibold transition hover:shadow-minimal-hover text-white" style={{ backgroundColor: "var(--brand-blue)" }}>
                {HERO.cta}
              </button>
              <button className="px-8 py-3 rounded-full font-semibold transition hover:bg-muted" style={{ borderColor: "var(--brand-blue)", color: "var(--brand-blue)" }}>
                Explore Features
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="animate-slide-in-right">
            <div className="relative h-96 bg-card rounded-2xl overflow-hidden shadow-minimal hover:shadow-minimal-hover transition-shadow">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "var(--brand-blue)" }}>
                    <GraduationCap size={48} className="text-white" />
                  </div>
                  <p className="text-foreground font-medium">Students Guided to Success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

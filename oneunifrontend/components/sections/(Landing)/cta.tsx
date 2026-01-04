"use client"

import { useState } from "react"
import { CTA as CTA_CONTENT } from "@/lib/content/landing-content"
import { EmailModal } from "../../forms/email-modal"
import { ThankYouSection } from "./thank-you-section"

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (email: string, input: string) => {
    console.log("[v0] Form submitted with email:", email)
    setIsModalOpen(false)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return <ThankYouSection onReset={handleReset} />
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-animate opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 backdrop-blur-3xl -z-10" />

      <section className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground leading-tight">
            {CTA_CONTENT.title}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">{CTA_CONTENT.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative cursor-pointer px-10 py-5 rounded-full font-bold text-lg text-white transition-all hover:scale-105 hover:shadow-2xl overflow-hidden animate-breathe"
              style={{ backgroundColor: "var(--brand-blue)" }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                 {CTA_CONTENT.primary}
              </span>
            </button>
            <button
              className="cursor-pointer px-10 py-5 rounded-full font-bold text-lg transition-all hover:bg-muted/50 hover:scale-105"
              style={{ borderColor: "var(--brand-blue)", color: "var(--brand-blue)", border: "2px solid" }}
            >
              {CTA_CONTENT.secondary}
            </button>
          </div>
        </div>
      </section>

      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </section>
  )
}

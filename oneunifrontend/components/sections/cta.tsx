"use client"

import { useState } from "react"
import { CTA as CTA_CONTENT } from "@/lib/content/landing-content"
import { EmailModal } from "../forms/email-modal"
import { ThankYouSection } from "../thank-you-section"

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
    <section id="contact">
      <section id="" className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ color: "var(--brand-blue)" }}>
            {CTA_CONTENT.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">{CTA_CONTENT.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer px-8 py-4 rounded-full font-semibold transition hover:shadow-minimal-hover text-white"
              style={{ backgroundColor: "var(--brand-blue)" }}
            >
              {CTA_CONTENT.primary}
            </button>
            <button
              className="cursor-pointer px-8 py-4 rounded-full font-semibold transition hover:bg-muted"
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

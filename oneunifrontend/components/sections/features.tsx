"use client"

import { FEATURES } from "@/lib/content/landing-content"
import FeatureCard from "../feature-card"

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
            Features in Action
          </h2>
          <p className="text-xl text-muted-foreground">See how One-University transforms your admission journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
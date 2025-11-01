"use client"

import { BarChart3, MessageCircle, Columns3, CheckCircle2 } from "lucide-react"
import { FEATURES } from "@/lib/content/landing-content"

const ICON_MAP: Record<string, any> = { BarChart3, MessageCircle, Columns3, CheckCircle2 }

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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {FEATURES.map((feature) => {
            const Icon = ICON_MAP[feature.icon] || BarChart3
            return (
              <div key={feature.id} className="bg-card p-8 rounded-xl shadow-minimal hover:shadow-minimal-hover transition-shadow">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "var(--brand-yellow)" }}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground" style={{ color: "var(--brand-blue)" }}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="h-48 bg-muted rounded-lg"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

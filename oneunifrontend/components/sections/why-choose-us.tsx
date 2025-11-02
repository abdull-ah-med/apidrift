"use client"

import { CheckCircle, Lock, Cloud, Users, Bell } from "lucide-react"
import { REASONS } from "@/lib/content/landing-content"

const ICON_MAP: Record<string, any> = { CheckCircle, Lock, Cloud, Users, Bell }

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
            Why Choose One-University?
          </h2>
          <p className="text-xl text-muted-foreground">Built for students, by education experts</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {REASONS.map((reason) => {
            const Icon = ICON_MAP[reason.icon] || CheckCircle
            return (
              <div key={reason.id} className="text-center p-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--brand-yellow)" }}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="font-bold mb-2 text-foreground" style={{ color: "var(--brand-blue)" }}>
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

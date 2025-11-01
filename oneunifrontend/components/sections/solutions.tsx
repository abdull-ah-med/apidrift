"use client"

import { User, Send, Search, CheckCircle, Bot, Users, BookOpen } from "lucide-react"
import { SOLUTIONS } from "@/lib/content/landing-content"

const ICON_MAP: Record<string, any> = { User, Send, Search, CheckCircle, Bot, Users, BookOpen }

export default function Solutions() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
            Introducing One-University
          </h2>
          <p className="text-xl text-muted-foreground">Your All-in-One Admission Companion</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS.map((solution) => {
            const Icon = ICON_MAP[solution.icon] || User
            return (
              <div key={solution.id} className="group bg-card p-8 rounded-xl shadow-minimal hover:shadow-minimal-hover transition-shadow cursor-pointer">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition group-hover:scale-110" style={{ backgroundColor: "var(--brand-blue)" }}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground" style={{ color: "var(--brand-blue)" }}>
                  {solution.title}
                </h3>
                <p className="text-muted-foreground">{solution.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

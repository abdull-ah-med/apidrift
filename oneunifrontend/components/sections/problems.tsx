"use client"

import { AlertCircle, Users, FileText, Calendar, HelpCircle, Brain } from "lucide-react"
import { PROBLEMS } from "@/lib/content/landing-content"

const ICON_MAP: Record<string, any> = {
  AlertCircle,
  Users,
  FileText,
  Calendar,
  HelpCircle,
  Brain,
}

export default function Problems() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
            The Challenges Students Face
          </h2>
          <p className="text-xl text-muted-foreground">We understand the pain points in your admission journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROBLEMS.map((problem) => {
            const Icon = ICON_MAP[problem.icon] || AlertCircle
            return (
              <div key={problem.id} className="bg-card p-8 rounded-xl shadow-minimal hover:shadow-minimal-hover transition-shadow  border border-border hover:border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "var(--brand-yellow)" }}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground" style={{ color: "var(--brand-blue)" }}>
                  {problem.title}
                </h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

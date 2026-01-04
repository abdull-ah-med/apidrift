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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
            Do You Also Face Problems like
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground">We understand the pain points in your journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROBLEMS.map((problem) => {
            const Icon = ICON_MAP[problem.icon] || AlertCircle
            return (
              <div 
                key={problem.id} 
                className="group bg-card p-8 rounded-xl border border-border hover:border-white/10 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "var(--brand-yellow)" }}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:translate-x-1 transition-transform duration-300" style={{ color: "var(--brand-blue)" }}>
                  {problem.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{problem.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

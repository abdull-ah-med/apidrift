"use client"

import { SOLUTIONS } from "@/lib/content/landing-content"
import SolutionCard from "../solution-card"

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
          {SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.id} {...solution} />
          ))}
        </div>
      </div>
    </section>
  )
}

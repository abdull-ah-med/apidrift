"use client"

import { TESTIMONIALS } from "@/lib/content/landing-content"
import TestimonialCard from "../cards/testimonial-card"

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
            What Students Say
          </h2>
          <p className="text-xl text-muted-foreground">Join thousands of successful students</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

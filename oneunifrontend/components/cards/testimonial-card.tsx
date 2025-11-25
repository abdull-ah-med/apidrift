"use client"

import { Star } from "lucide-react"

interface TestimonialCardProps {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

export default function TestimonialCard({ name, role, content, rating }: TestimonialCardProps) {
  return (
    <div className="bg-card p-8 rounded-xl shadow-minimal hover:shadow-minimal-hover transition-shadow">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-muted-foreground mb-6 leading-relaxed">"{content}"</p>
      <div>
        <p className="font-bold text-foreground" style={{ color: "var(--brand-blue)" }}>
          {name}
        </p>
        <p className="text-muted-foreground text-sm">{role}</p>
      </div>
    </div>
  )
}

"use client"

import { User, Send, Search, CheckCircle, Bot, Users, BookOpen, Compass, Database, HeartHandshake, LucideIcon } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = { 
  User, 
  Send, 
  Search, 
  CheckCircle, 
  Bot, 
  Users, 
  BookOpen, 
  Compass, 
  Database, 
  HeartHandshake 
}

interface SolutionCardProps {
  id: string
  icon: string
  title: string
  description: string
}

export default function SolutionCard({ icon, title, description }: SolutionCardProps) {
  const Icon = ICON_MAP[icon] || User

  return (
    <div className="group bg-card p-8 rounded-xl border border-border hover:border-primary/50 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
      <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "var(--brand-blue)" }}>
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:translate-x-1 transition-transform duration-300" style={{ color: "var(--brand-blue)" }}>
        {title}
      </h3>
      <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{description}</p>
    </div>
  )
}

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
    <div className="group bg-card p-8 rounded-xl shadow-minimal hover:shadow-minimal-hover transition-shadow cursor-pointer border border-border hover:border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition group-hover:scale-110" style={{ backgroundColor: "var(--brand-blue)" }}>
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-lg font-bold mb-2 text-foreground" style={{ color: "var(--brand-blue)" }}>
        {title}
      </h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

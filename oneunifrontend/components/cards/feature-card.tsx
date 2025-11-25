"use client"

import { BarChart3, MessageCircle, Columns3, CheckCircle2, TrendingUp, Bell, Calendar, Trophy, ArrowRight, LucideIcon } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = { 
  BarChart3, 
  MessageCircle, 
  Columns3, 
  CheckCircle2,
  TrendingUp,
  Bell,
  Calendar,
  Trophy
}

interface FeaturePoint {
  icon: string
  text: string
}

interface FeatureCardProps {
  id: string
  icon: string
  title: string
  description: string
  points: FeaturePoint[]
  index: number
}

export default function FeatureCard({ icon, title, points, index }: FeatureCardProps) {
  const Icon = ICON_MAP[icon] || BarChart3

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
    >
      {/* Main content with improved padding and spacing */}
      <div className="p-8 flex flex-col h-full gap-6">
        {/* Icon and Title in a row with feature number */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: "var(--brand-yellow)" }}
            >
              <Icon size={32} className="text-white" />
            </div>
            <h3
              className="text-xl font-bold text-foreground group-hover:translate-x-1 transition-transform"
              style={{ color: "var(--brand-blue)" }}
            >
              {title}
            </h3>
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>

        {/* Points List */}
        <div className="flex-1">
          <ul className="space-y-3">
            {points.map((point, idx) => {
              const PointIcon = ICON_MAP[point.icon]
              return (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {PointIcon && (
                      <PointIcon
                        size={18}
                        className="text-muted-foreground group-hover:text-foreground transition-colors"
                      />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed">{point.text}</span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer pt-2 border-t border-border/30">
          <span>Learn more</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div> */}
      </div>
    </div>
  )
}

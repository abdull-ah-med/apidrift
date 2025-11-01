"use client"

import { BarChart3, MessageCircle, Columns3, CheckCircle2, TrendingUp, Bell, Calendar, Trophy } from "lucide-react"
import { FEATURES } from "@/lib/content/landing-content"

const ICON_MAP: Record<string, any> = { 
  BarChart3, 
  MessageCircle, 
  Columns3, 
  CheckCircle2,
  TrendingUp,
  Bell,
  Calendar,
  Trophy
}

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
            Features in Action
          </h2>
          <p className="text-xl text-muted-foreground">See how One-University transforms your admission journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {FEATURES.map((feature) => {
            const Icon = ICON_MAP[feature.icon] || BarChart3
            return (
              <div 
                key={feature.id} 
                className="group bg-card p-6 rounded-2xl border border-border hover:border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Icon and Title Section */}
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" 
                    style={{ backgroundColor: "var(--brand-yellow)" }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors" style={{ color: "var(--brand-blue)" }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Points List */}
                <div className="mt-5 pt-5 border-t border-border/50">
                  <ul className="space-y-3">
                    {feature.points.map((point, idx) => {
                      const PointIcon = ICON_MAP[point.icon]
                      return (
                        <li key={idx} className="flex items-start gap-3 group/item">
                          <div className="flex-shrink-0 mt-0.5">
                            {PointIcon && (
                              <div className="w-5 h-5 rounded-md flex items-center justify-center bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                                <PointIcon
                                  size={14}
                                  className="text-primary"
                                  style={{ color: "var(--brand-blue)" }}
                                />
                              </div>
                            )}
                          </div>
                          <span className="text-md text-foreground/80 leading-relaxed group-hover/item:text-foreground transition-colors">
                            {point.text}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
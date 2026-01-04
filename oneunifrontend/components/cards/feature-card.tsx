"use client"

import { BarChart3, MessageCircle, Columns3, CheckCircle2, TrendingUp, Bell, Calendar, Trophy, ArrowRight, LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
}

export default function FeatureCard({ icon, title, points, index }: FeatureCardProps) {
  const Icon = ICON_MAP[icon] || BarChart3

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="group relative bg-white/50 dark:bg-card/50 glass rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 flex flex-col h-full gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: "var(--brand-yellow)" }}
            >
              <Icon size={28} className="text-white" />
            </div>
            <h3
              className="text-xl font-bold text-foreground group-hover:text-primary transition-colors"
            >
              {title}
            </h3>
          </div>
          <span className="text-4xl font-bold text-muted/20 select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex-1">
          <ul className="space-y-4">
            {points.map((point, idx) => {
              const PointIcon = ICON_MAP[point.icon]
              return (
                <li key={idx} className="flex items-start gap-3 group/item">
                  <div className="flex-shrink-0 mt-1">
                    {PointIcon && (
                      <PointIcon
                        size={16}
                        className="text-muted-foreground group-hover/item:text-accent transition-colors"
                      />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">
                    {point.text}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

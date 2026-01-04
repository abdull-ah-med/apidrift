"use client"

import { CheckCircle, Lock, Cloud, Users, Bell } from "lucide-react"
import { REASONS } from "@/lib/content/landing-content"
import { motion, Variants } from "framer-motion"

const ICON_MAP: Record<string, any> = { CheckCircle, Lock, Cloud, Users, Bell }

export default function WhyChooseUs() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", bounce: 0.4 }
    }
  }

  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Choose <span className="text-primary">One-University</span>?
          </h2>
          <p className="text-xl text-muted-foreground">Built  for students, by education experts</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {REASONS.map((reason, idx) => {
            const Icon = ICON_MAP[reason.icon] || CheckCircle
            return (
              <motion.div 
                key={reason.id} 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="text-center p-6 rounded-2xl bg-muted/20 hover:bg-white dark:hover:bg-card border border-transparent hover:border-border hover:shadow-xl transition-all duration-300 group"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300" 
                  style={{ backgroundColor: "var(--brand-yellow)" }}
                >
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

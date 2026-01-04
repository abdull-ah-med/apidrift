"use client"

import { FEATURES } from "@/lib/content/landing-content"
import FeatureCard from "../../cards/feature-card"
import { motion } from "framer-motion"

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Our Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Features in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how One-University transforms your admission journey with our comprehensive suite of tools.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 lg:gap-10"
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.id} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
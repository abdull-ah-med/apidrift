"use client";

import Image from "next/image";
import Link from "next/link";
import { HERO } from "@/lib/content/landing-content";
import OneUniN from "@/public/Logo/OneUniN.png";
import Button from "../../ui/button";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-20 md:pt-16 md:pb-32 px-4 sm:px-6 lg:px-8 transition-colors min-h-[90vh] flex items-center">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 bg-gradient-animate opacity-40 pointer-events-none" />
      
      {/* Abstract Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content (Text) - Now First on Desktop */}
          <motion.div 
            className="flex flex-col text-center md:text-left order-2 md:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm inline-block">
                Welcome to One-University
              </span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-foreground tracking-tight"
            >
              <span className="block">Your Path to</span>
              <span className="text-primary">Academic Excellence</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0"
            >
              {HERO.subtitle}
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link href="/registration">
                <Button
                  variant="primary"
                  className="w-full sm:w-auto text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                >
                  {HERO.cta}
                </Button>
              </Link>
              <Button
                variant="secondary"
                className="w-full sm:w-auto text-lg px-8 py-6 backdrop-blur-sm"
                onClick={() => {
                  const featuresSection = document.getElementById("features");
                  featuresSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Features
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Illustration (Image) */}
          <motion.div 
            className="order-1 md:order-2 perspective-1000"
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative animate-float">
               <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl rounded-full" />
              <div className="relative aspect-square md:aspect-[4/3] bg-white/50 dark:bg-card/50 glass rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                  <Image
                    src={OneUniN}
                    alt="One-University Logo"
                    className="w-full h-full object-contain drop-shadow-xl"
                    priority
                  />
                </div>
              </div>
              
              {/* Floating Badge Example */}
              <motion.div 
                className="absolute -bottom-6 -left-6 glass px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Status</p>
                  <p className="text-sm font-bold text-foreground">Accepting Students</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

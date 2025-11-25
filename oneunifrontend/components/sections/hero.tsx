"use client";

import Image from "next/image";
import { HERO } from "@/lib/content/landing-content";
import OneUniN from "@/public/Logo/OneUniN.png";
import Button from "../ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-3 md:pt-4 pb-32 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-1 gap-12  direction-ltr items-center">
          {/* Right Illustration */}
          <div className="animate-slide-in-right">
            <div className="relative h-96 bg-card rounded-2xl overflow-hidden shadow-minimal hover:shadow-minimal-hover transition-shadow">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                {/* Replace src with your actual image/logo path */}
                <Image
                  src={OneUniN}
                  alt="One-University Logo"
                  className="w-full h-full object-contain"
                  height={500}
                  width={500}
                />
                {/* Fallback icon - remove this when you add your image */}
                {/* <div className="text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "var(--brand-blue)" }}>
                    <GraduationCap size={48} className="text-white" />
                  </div>
                  <p className="text-foreground font-medium">Students Guided to Success</p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Left Content */}
          <div className="animate-fade-in-up flex items-center flex-col">
            <h1
              className="text-4xl md:text-5xl text-center font-bold leading-tight mb-3 text-foreground"
              style={{ color: "var(--brand-blue)" }}
            >
              {HERO.title}
            </h1>
            <p className="text-center text-md text-muted-foreground mb-8 leading-relaxed">
              {HERO.subtitle}
            </p>
            <div className="flex sm:flex-row gap-4">
              <Button
              variant="primary"
                onClick={() => {
                  const featuresSection = document.getElementById("contact");
                  featuresSection?.scrollIntoView({ behavior: "smooth" });
                }}
                // className="cursor-pointer px-8 py-3 rounded-full font-semibold transition hover:shadow-minimal-hover text-white"
              >
                {HERO.cta}
              </Button>
              <Button
              variant="secondary"
                onClick={() => {
                  const featuresSection = document.getElementById("features");
                  featuresSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
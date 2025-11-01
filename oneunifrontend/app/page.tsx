import Header from "@/components/layout/header"
import Hero from "@/components/sections/hero"
import Problems from "@/components/sections/problems"
import Solutions from "@/components/sections/solutions"
import Features from "@/components/sections/features"
import WhyChooseUs from "@/components/sections/why-choose-us"
import Testimonials from "@/components/sections/testimonials"
import CTA from "@/components/sections/cta"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Header />
      <Hero />
      <Problems />
      <Solutions />
      <Features />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}

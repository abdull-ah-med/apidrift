import Header from "@/components/layout/header"
import Hero from "@/components/sections/(Landing)/hero"
import Problems from "@/components/sections/(Landing)/problems"
import Solutions from "@/components/sections/(Landing)/solutions"
import Features from "@/components/sections/(Landing)/features"
import WhyChooseUs from "@/components/sections/(Landing)/why-choose-us"
import Testimonials from "@/components/sections/(Landing)/testimonials"
import CTA from "@/components/sections/(Landing)/cta"
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

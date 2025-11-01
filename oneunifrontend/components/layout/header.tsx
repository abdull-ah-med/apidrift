"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-background shadow-minimal transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "var(--brand-blue)" }}></div>
          <span className="font-bold text-xl text-foreground" style={{ color: "var(--brand-blue)" }}>
            One-University
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition">
            Features
          </Link>
          <Link href="#why-us" className="text-muted-foreground hover:text-foreground transition">
            Why Us
          </Link>
          <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition">
            Testimonials
          </Link>
          <Link href="#contact" className="text-muted-foreground hover:text-foreground transition">
            Contact
          </Link>
        </div>

        {/* CTA Button and Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition" aria-label="Toggle theme">
            {isDark ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-muted-foreground" />}
          </button>
          <button
            className="px-6 py-2 rounded-full font-medium transition hover:shadow-minimal-hover text-white"
            style={{ backgroundColor: "var(--brand-blue)" }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition" aria-label="Toggle theme">
            {isDark ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-muted-foreground" />}
          </button>
          <button className="p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background px-4 py-4 space-y-4 transition-colors border-t border-border">
          <Link href="#features" className="block text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#why-us" className="block text-muted-foreground hover:text-foreground">
            Why Us
          </Link>
          <Link href="#testimonials" className="block text-muted-foreground hover:text-foreground">
            Testimonials
          </Link>
          <Link href="#contact" className="block text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <button
            className="w-full px-6 py-2 rounded-full font-medium transition text-white"
            style={{ backgroundColor: "var(--brand-blue)" }}
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  )
}

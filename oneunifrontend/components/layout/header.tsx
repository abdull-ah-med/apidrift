"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import Image from "next/image"
import OneUniL from "@/public/Logo/OneUniL.png"
import Button from "../ui/button"

const NAV_ITEMS = [
  { id: 'features', label: 'Features' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

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
         <Image src={OneUniL} height={80} width={80} alt="Logo"/>
          <span className="font-bold text-xl text-foreground" style={{ color: "var(--brand-yellow)" }}>
            One-<span className="text-primary">University</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer text-muted-foreground hover:text-accent transition cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA Button and Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition" aria-label="Toggle theme">
            {isDark ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-muted-foreground" />}
          </button>
          <Button
          variant="primary"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            // className="cursor-pointer px-6 py-2 rounded-full font-medium transition hover:shadow-minimal-hover text-white"
          children="Get Started"/
          >
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition" aria-label="Toggle theme">
            {isDark ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-muted-foreground" />}
          </button>
          <button className="cursor-pointer p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background px-4 py-4 space-y-4 transition-colors border-t border-border">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                setIsOpen(false)
              }}
              className="block w-full text-left text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
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

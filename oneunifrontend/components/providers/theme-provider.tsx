"use client"

import type React from "react"
import { useEffect, useState } from "react"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Force light mode for now as requested
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }, [])

  if (!mounted) return <>{children}</>

  return <>{children}</>
}

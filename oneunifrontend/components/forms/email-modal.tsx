"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string, input: string) => void
}

export function EmailModal({ isOpen, onClose, onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message: userInput,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email")
      }

      onSubmit(email, userInput)
      setEmail("")
      setUserInput("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-muted">
          <h2 className="text-2xl font-bold text-foreground">Get Started</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-muted bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
            />
          </div>

          <div>
            <label htmlFor="input" className="block text-sm font-medium text-foreground mb-2">
              Tell us about yourself
            </label>
            <textarea
              id="input"
              required
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="What are your admission goals?"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-muted bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full px-6 py-3 rounded-full font-semibold text-white transition disabled:opacity-50"
            style={{ backgroundColor: "var(--brand-blue)" }}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

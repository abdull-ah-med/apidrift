"use client"

import { Mail, Linkedin, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background shadow-minimal transition-colors border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "var(--brand-blue)" }}></div>
              <span className="font-bold text-lg text-foreground" style={{ color: "var(--brand-blue)" }}>
                One-University
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your all-in-one companion for the university admission journey
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-foreground" style={{ color: "var(--brand-blue)" }}>
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">© 2025 One-University. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="mailto:hello@one-university.com"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Mail size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

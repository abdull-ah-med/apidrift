"use client";

import { Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import OneUniL from "@/public/Logo/OneUniL.png";
import Image from "next/image";
import { SOCIALS } from "@/lib/content/landing-content";

const ICON_MAP: Record<string, any> = {
  Mail,
  Linkedin,
};

const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Contact", href: "#contact" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  company: [
    { label: "About", href: "#hero" },
    { label: "Problems", href: "#problems" },
    { label: "Solution", href: "#solution" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-of-service" },
    { label: "FAQs", href: "#faqs" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background shadow-minimal transition-colors border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <Image src={OneUniL} height={50} width={50} alt="Logo" />
              <span
                className="font-bold text-lg text-foreground"
                style={{ color: "var(--brand-blue)" }}
              >
                One-University
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your all-in-one companion for the university admission journey
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-bold mb-4 text-foreground"
              style={{ color: "var(--brand-blue)" }}
            >
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-foreground transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="font-bold mb-4 text-foreground"
              style={{ color: "var(--brand-blue)" }}
            >
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-foreground transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="font-bold mb-4 text-foreground"
              style={{ color: "var(--brand-blue)" }}
            >
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-foreground transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 One-University. All rights reserved.
          </p>
          <div className="flex gap-4">
            {SOCIALS.map((social) => {
              const Icon = ICON_MAP[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition"
                  aria-label={social.label}
                >
                  {Icon && <Icon size={20} />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

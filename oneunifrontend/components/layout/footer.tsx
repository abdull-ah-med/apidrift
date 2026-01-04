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
    <footer className="relative bg-background/60 backdrop-blur-lg border-t border-border mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image 
                src={OneUniL} 
                alt="Logo" 
                className="w-auto h-12 object-contain" 
                width={120} 
                height={48} 
              />
              <span
                className="font-bold text-xl text-foreground flex flex-col leading-tight"
              >
                <span style={{ color: "var(--brand-yellow)" }}>One-</span>
                <span className="text-primary">University</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your all-in-one companion for a simplified university admission journey. Experience the future of enrollment.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-6 text-foreground">Product</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {FOOTER_LINKS.product.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-primary transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-foreground">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-primary transition-colors flex items-center gap-2 group">
                       <span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-foreground">Legal</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-primary transition-colors flex items-center gap-2 group">
                       <span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} One-University. All rights reserved.
          </p>
          <div className="flex gap-6">
            {SOCIALS.map((social) => {
              const Icon = ICON_MAP[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-accent transition-transform hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {Icon && <Icon size={22} />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

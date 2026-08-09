"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { GITHUB_URL } from "@/lib/site";
import { GitHubIcon } from "@/components/icons/github";
import { BrandMark } from "@/components/logo";
import { springQuiet } from "@/components/motion/reveal";

const menuItems = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "Workspace", href: "/app" },
];

export function SiteHeader() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const githubHref = GITHUB_URL.trim() || undefined;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        className={cn(
          "w-full transition-[background,box-shadow,border-color] duration-300",
          isScrolled || menuState
            ? "material-toolbar border-b border-hairline shadow-[0_1px_0_rgb(255_255_255_/_0.06)_inset]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative flex items-center justify-between gap-6 py-3">
            <BrandMark />

            <div className="hidden items-center gap-8 lg:flex">
              <ul className="flex items-center gap-6">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="type-caption pressable text-[13px] text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2">
                <Button
                  asChild={Boolean(githubHref)}
                  size="sm"
                  variant="ghost"
                  disabled={!githubHref}
                  title={githubHref ? "View source on GitHub" : "GitHub link coming soon"}
                  className="pressable"
                >
                  {githubHref ? (
                    <a href={githubHref} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon className="size-4" />
                      <span>Code</span>
                    </a>
                  ) : (
                    <>
                      <GitHubIcon className="size-4" />
                      <span>Code</span>
                    </>
                  )}
                </Button>
                <Button asChild size="sm" className="pressable">
                  <Link href="/app">
                    <span>Open workspace</span>
                  </Link>
                </Button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMenuState((open) => !open)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              aria-expanded={menuState}
              className="pressable relative z-20 -m-2.5 block cursor-pointer p-2.5 text-foreground lg:hidden"
            >
              {menuState ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuState ? (
            <motion.div
              key="mobile-menu"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={reduce ? { duration: 0.15 } : springQuiet}
              className="border-t border-hairline px-6 pb-5 lg:hidden"
            >
              <ul className="space-y-1 py-3">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuState(false)}
                      className="pressable block rounded-xl px-3 py-2.5 text-[15px] text-foreground hover:bg-white/8"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 pt-1">
                <Button asChild size="lg" className="pressable w-full">
                  <Link href="/app" onClick={() => setMenuState(false)}>
                    Open workspace
                  </Link>
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}

/** @deprecated Use SiteHeader */
export const HeroHeader = SiteHeader;

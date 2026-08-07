"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { GITHUB_URL } from "@/lib/site";
import { GitHubIcon } from "@/components/icons/github";
import { BrandMark } from "@/components/logo";

const menuItems = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "Workspace", href: "/app" },
];

export function SiteHeader() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const githubHref = GITHUB_URL.trim() || undefined;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        data-state={menuState && "active"}
        className={cn(
          "w-full transition-all duration-300",
          isScrolled && "border-b border-border/80 bg-background/85 backdrop-blur-md",
        )}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0">
            <div className="flex w-full justify-between gap-6 lg:w-auto">
              <BrandMark />
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
              </button>
            </div>
            
            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-2xl border border-border bg-card p-6 shadow-none in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-3 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild={Boolean(githubHref)}
                  size="sm"
                  variant="outline"
                  className="border-border"
                  disabled={!githubHref}
                  title={githubHref ? "View source on GitHub" : "GitHub link coming soon"}
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
                <Button asChild size="sm">
                  <Link href="/app">
                    <span>Open workspace</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

/** @deprecated Use SiteHeader */
export const HeroHeader = SiteHeader;

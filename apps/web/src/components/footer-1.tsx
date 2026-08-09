import Link from "next/link";
import { GITHUB_URL } from "@/lib/site";
import { GitHubIcon } from "@/components/icons/github";
import { BrandMark } from "@/components/logo";

const links = [
  { title: "Workspace", href: "/app" },
  { title: "How it works", href: "/#how-it-works" },
];

export default function Footer() {
  const githubHref = GITHUB_URL.trim() || undefined;

  return (
    <footer className="border-t border-hairline pb-12 pt-10">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <BrandMark />
          <p className="type-caption text-[13px] text-muted-foreground">
            Semantic API contract change detection
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="pressable type-caption text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          ))}
          {githubHref ? (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable type-caption inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-3.5" />
              Code
            </a>
          ) : (
            <span
              className="type-caption inline-flex cursor-not-allowed items-center gap-1.5 text-[13px] text-muted-foreground/50"
              title="GitHub link coming soon"
            >
              <GitHubIcon className="size-3.5" />
              Code
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}

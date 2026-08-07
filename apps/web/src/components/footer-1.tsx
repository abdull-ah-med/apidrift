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
    <footer className="border-t border-border bg-panel py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6">
        <BrandMark />
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.title}
            </Link>
          ))}
          {githubHref ? (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <GitHubIcon className="size-3.5" />
              Code
            </a>
          ) : (
            <span
              className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm text-muted-foreground/50"
              title="GitHub link coming soon"
            >
              <GitHubIcon className="size-3.5" />
              Code
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Semantic API contract change detection
        </p>
      </div>
    </footer>
  );
}

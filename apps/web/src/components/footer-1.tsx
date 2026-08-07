import Link from "next/link";

const links = [
  { title: "Workspace", href: "/app" },
  { title: "How it works", href: "/#how-it-works" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-panel py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6">
        <Link href="/" className="font-mono text-sm tracking-[0.22em] text-accent-signal uppercase">
          APIDrift
        </Link>
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
        </div>
        <p className="text-xs text-muted-foreground">
          Semantic API contract change detection
        </p>
      </div>
    </footer>
  );
}

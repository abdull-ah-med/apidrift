import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center gap-8 px-6 py-16">
      <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">APIDrift</p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
        Semantic API contract change detection
      </h1>
      <p className="max-w-2xl text-lg text-foreground/75">
        Paste two API responses or OpenAPI specs. See what changed, whether it breaks
        clients, and how to migrate — with a one-click Migration Guide.
      </p>
      <div className="flex gap-4">
        <Link
          href="/app"
          className="rounded-md bg-accent px-5 py-3 font-medium text-background transition hover:opacity-90"
        >
          Open workspace
        </Link>
      </div>
    </main>
  );
}

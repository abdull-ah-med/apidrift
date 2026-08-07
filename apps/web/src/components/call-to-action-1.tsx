import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-semibold text-balance text-foreground lg:text-4xl">
            Catch contract drift before your clients do
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Paste a before/after payload and get a migration-ready report in seconds.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/app">Open workspace</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/app">Try with examples</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

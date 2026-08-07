import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Structural + semantic diff",
    body: "Compare JSON responses or OpenAPI specs beyond line-by-line text. Paths, types, enums, and nullability are first-class.",
  },
  {
    title: "Breaking change classification",
    body: "Every change is tagged Breaking, Non-Breaking, or Deprecation, aligned with established OpenAPI change-review practice.",
  },
  {
    title: "Migration snippets",
    body: "Deterministic TypeScript, Python, and curl snippets for each breaking change so clients know how to adapt.",
  },
  {
    title: "Migration Guide export",
    body: "One click produces a clean markdown guide you can drop into a PR or release notes.",
  },
];

export default function Features() {
  return (
    <section id="how-it-works" className="border-t border-border bg-panel/60 py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Badge variant="secondary" className="mb-4 rounded-md font-mono text-[10px] tracking-wide">
          Why APIDrift
        </Badge>
        <h2 className="text-4xl font-semibold tracking-tight text-foreground text-balance">
          Diffs that speak contract language
        </h2>
        <p className="mt-4 mb-12 max-w-2xl text-lg text-muted-foreground text-balance">
          Most tools stop at “field X was removed.” APIDrift tells you whether that
          removal breaks clients, and how to migrate.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="rounded-lg border-border bg-card/70 shadow-none">
              <CardHeader>
                <CardTitle className="text-lg font-medium">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

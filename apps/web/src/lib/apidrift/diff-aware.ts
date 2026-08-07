import type { DiffResult } from "./types";

export function buildDiffAwareReply(
  question: string,
  result: DiffResult | null,
): string {
  const q = question.toLowerCase();

  if (!result) {
    return [
      "No DiffResult is loaded yet.",
      "",
      "1. Paste before/after payloads in the workspace.",
      "2. Click **Run semantic diff**.",
      "3. Ask me about breaking changes, snippets, or how to migrate.",
      "",
      "Tip: set `OPENAI_API_KEY` in `.env.local` for cloud LLM answers; otherwise I stay on this DiffAware local mode.",
    ].join("\n");
  }

  const { summary, changes, snippets, warnings } = result;
  const breaking = changes.filter((c) => c.classification === "breaking");
  const deprecations = changes.filter((c) => c.classification === "deprecation");

  if (q.includes("break") || q.includes("critical") || q.includes("risk")) {
    if (breaking.length === 0) {
      return `No breaking changes in the current diff (${summary.total} total changes).`;
    }
    const lines = [
      `Found **${breaking.length}** breaking change(s):`,
      "",
      ...breaking.slice(0, 12).map(
        (c) => `- \`${c.id}\` **${c.path}** — ${c.summary} (${c.severity})`,
      ),
    ];
    if (breaking.length > 12) lines.push(`- …and ${breaking.length - 12} more`);
    lines.push("", "Ask for a specific change id to see migration guidance.");
    return lines.join("\n");
  }

  if (q.includes("deprec")) {
    if (deprecations.length === 0) return "No deprecations detected in this diff.";
    return [
      `Deprecations (${deprecations.length}):`,
      "",
      ...deprecations.map((c) => `- \`${c.id}\` **${c.path}** — ${c.summary}`),
    ].join("\n");
  }

  if (q.includes("snippet") || q.includes("migrat") || q.includes("code") || q.includes("fix")) {
    if (snippets.length === 0) {
      return "No migration snippets were generated (often means no breaking changes).";
    }
    return [
      "Migration snippets from the latest DiffResult:",
      "",
      ...snippets.map(
        (s) =>
          `### ${s.title} (\`${s.language}\`)\n\`\`\`${s.language}\n${s.code}\n\`\`\``,
      ),
    ].join("\n");
  }

  if (q.includes("warn")) {
    if (warnings.length === 0) return "No warnings on this DiffResult.";
    return ["Warnings:", "", ...warnings.map((w) => `- ${w}`)].join("\n");
  }

  const idMatch = question.match(/chg_\d+|oas_\d+/i);
  if (idMatch) {
    const hit = changes.find((c) => c.id.toLowerCase() === idMatch[0].toLowerCase());
    if (!hit) return `I could not find change id \`${idMatch[0]}\` in the current DiffResult.`;
    return [
      `### \`${hit.id}\``,
      "",
      `- Path: \`${hit.path}\``,
      `- Kind: \`${hit.kind}\``,
      `- Classification: **${hit.classification}**`,
      `- Severity: \`${hit.severity}\``,
      `- Summary: ${hit.summary}`,
      hit.before_value !== undefined ? `- Before: \`${JSON.stringify(hit.before_value)}\`` : "",
      hit.after_value !== undefined ? `- After: \`${JSON.stringify(hit.after_value)}\`` : "",
      "",
      hit.classification === "breaking"
        ? "This is breaking — update clients before deploying, and use the generated snippets."
        : "This is not classified as breaking, but still review dependent consumers.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    "### Diff overview",
    "",
    `| Total | Breaking | Non-breaking | Deprecation |`,
    `| ---: | ---: | ---: | ---: |`,
    `| ${summary.total} | ${summary.breaking} | ${summary.non_breaking} | ${summary.deprecation} |`,
    "",
    `Input mode: \`${result.input_kind}\``,
    "",
    "Try asking:",
    "- What are the breaking changes?",
    "- Show migration snippets",
    "- Explain `chg_1`",
    "- Any deprecations?",
  ].join("\n");
}

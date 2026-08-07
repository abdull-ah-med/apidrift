import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { buildDiffAwareReply } from "@/lib/apidrift/diff-aware";
import type { DiffResult } from "@/lib/apidrift/types";

export const maxDuration = 30;

type ChatBody = {
  messages: UIMessage[];
  system?: string;
  tools?: unknown;
  diffResult?: DiffResult | null;
};

export async function POST(req: Request) {
  const body = (await req.json()) as ChatBody;
  const { messages, system, tools, diffResult } = body;

  const baseSystem = [
    "You are APIDrift Assistant — an expert on API contract changes, breaking changes, and client migrations.",
    "Answer using the provided DiffResult when available. Cite change ids. Prefer concrete migration steps.",
    system ?? "",
    diffResult
      ? `Current DiffResult JSON:\n${JSON.stringify(diffResult, null, 2)}`
      : "No DiffResult is loaded yet. Ask the user to run a semantic diff in the workspace.",
  ]
    .filter(Boolean)
    .join("\n\n");

  if (process.env.OPENAI_API_KEY) {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: baseSystem,
      messages: await convertToModelMessages(messages),
      tools: {
        ...frontendTools(tools as never),
      },
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const userText = extractText(lastUser);
  const reply = buildDiffAwareReply(userText, diffResult ?? null);

  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      const id = "local-text";
      writer.write({ type: "text-start", id });
      for (const part of chunkText(reply, 48)) {
        writer.write({ type: "text-delta", id, delta: part });
      }
      writer.write({ type: "text-end", id });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

function extractText(message: UIMessage | undefined): string {
  if (!message) return "";
  const parts = message.parts ?? [];
  return parts
    .map((part) => {
      if (part.type === "text" && "text" in part) return String(part.text);
      return "";
    })
    .join("")
    .trim();
}

function chunkText(text: string, size: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    out.push(text.slice(i, i + size));
  }
  return out.length ? out : [""];
}

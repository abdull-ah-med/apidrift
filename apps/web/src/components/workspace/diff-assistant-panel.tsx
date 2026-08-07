"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import {
  AssistantChatTransport,
  useChatRuntime,
} from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { useDiffResult } from "@/components/workspace/diff-result-context";
import { useMemo } from "react";

export function DiffAssistantPanel() {
  const { result } = useDiffResult();

  const transport = useMemo(
    () =>
      new AssistantChatTransport({
        api: "/api/chat",
        body: { diffResult: result },
      }),
    [result],
  );

  const runtime = useChatRuntime({ transport });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div
        id="tour-assistant"
        className="flex h-[560px] flex-col overflow-hidden rounded-xl border border-border bg-background"
      >
        <div className="border-b border-border px-4 py-3">
          <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            Assistant
          </p>
          <p className="text-sm text-muted-foreground">
            {result
              ? `Grounded on ${result.summary.total} change(s)`
              : "Run a diff to ground answers"}
            {" · OpenAI if OPENAI_API_KEY is set, else DiffAware local"}
          </p>
        </div>
        <div className="min-h-0 flex-1">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}

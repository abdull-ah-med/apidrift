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
        className="flex h-full min-h-[420px] flex-col bg-card/30 lg:min-h-0"
      >
        <div className="shrink-0 border-b border-border px-4 py-3">
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent-signal uppercase">
            Assistant
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {result
              ? `Grounded on ${result.summary.total} change(s)`
              : "Run a diff to ground answers"}
            {" · local DiffAware unless OPENAI_API_KEY is set"}
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}

import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./systemPrompt";

export type ChatMessage = { role: "user" | "assistant"; content: string };

const MODEL = "claude-sonnet-4-5";
const MAX_TOKENS = 800;
export const MAX_HISTORY = 30;

export const sanitizeMessages = (raw: unknown): ChatMessage[] => {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string"
    )
    .slice(-MAX_HISTORY);
};

export const streamChatResponse = (messages: ChatMessage[], apiKey: string): ReadableStream<Uint8Array> => {
  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const response = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: SYSTEM_PROMPT,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta" &&
            event.delta.text
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[chat] stream error:", message);
        controller.enqueue(
          encoder.encode(
            `\n\n[Sorry — I hit a snag on my end. Please try again, or email contact@apexifylabs.com.]`
          )
        );
      } finally {
        controller.close();
      }
    },
  });
};

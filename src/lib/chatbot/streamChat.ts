import { SYSTEM_PROMPT } from "./systemPrompt.js";

export type ChatMessage = { role: "user" | "assistant"; content: string };

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
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

interface AnthropicStreamEvent {
  type: string;
  delta?: { type?: string; text?: string };
}

export const streamChatResponse = (
  messages: ChatMessage[],
  apiKey: string
): ReadableStream<Uint8Array> => {
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const response = await fetch(ANTHROPIC_URL, {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": ANTHROPIC_VERSION,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            system: SYSTEM_PROMPT,
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
            stream: true,
          }),
        });

        if (!response.ok || !response.body) {
          const errText = await response.text().catch(() => "");
          throw new Error(`Anthropic API ${response.status}: ${errText.slice(0, 240)}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);
            if (!line.startsWith("data: ")) continue;

            const payload = line.slice("data: ".length);
            if (payload === "[DONE]") continue;

            try {
              const event = JSON.parse(payload) as AnthropicStreamEvent;
              if (
                event.type === "content_block_delta" &&
                event.delta?.type === "text_delta" &&
                event.delta.text
              ) {
                controller.enqueue(encoder.encode(event.delta.text));
              }
            } catch {
              /* ignore malformed SSE chunks */
            }
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[chat] stream error:", message);
        controller.enqueue(
          encoder.encode(
            `\n\n[Sorry, I hit a snag on my end. Please try again, or email contact@apexifylabs.com.]`
          )
        );
      } finally {
        controller.close();
      }
    },
  });
};

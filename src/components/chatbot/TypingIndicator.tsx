export const TypingIndicator = () => (
  <div
    className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm w-fit"
    style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid hsl(var(--accent) / 0.18)",
    }}
    aria-label="Aria is typing"
  >
    <span
      className="block h-1.5 w-1.5 rounded-full bg-accent/80"
      style={{ animation: "chatbot-typing-bounce 1.2s ease-in-out infinite", animationDelay: "0ms" }}
    />
    <span
      className="block h-1.5 w-1.5 rounded-full bg-accent/80"
      style={{ animation: "chatbot-typing-bounce 1.2s ease-in-out infinite", animationDelay: "180ms" }}
    />
    <span
      className="block h-1.5 w-1.5 rounded-full bg-accent/80"
      style={{ animation: "chatbot-typing-bounce 1.2s ease-in-out infinite", animationDelay: "360ms" }}
    />
  </div>
);

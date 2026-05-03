import { type FC, type ReactNode } from "react";

interface Props {
  role: "user" | "assistant";
  children: ReactNode;
}

const EMAIL_RE = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/gi;
const URL_RE = /\bhttps?:\/\/[^\s<>"'()]+/gi;

const linkify = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  const matches: { start: number; end: number; href: string; label: string }[] = [];

  for (const m of text.matchAll(EMAIL_RE)) {
    if (m.index === undefined) continue;
    matches.push({ start: m.index, end: m.index + m[0].length, href: `mailto:${m[0]}`, label: m[0] });
  }
  for (const m of text.matchAll(URL_RE)) {
    if (m.index === undefined) continue;
    matches.push({ start: m.index, end: m.index + m[0].length, href: m[0], label: m[0] });
  }
  matches.sort((a, b) => a.start - b.start);

  for (const match of matches) {
    if (match.start < lastIndex) continue;
    if (match.start > lastIndex) {
      nodes.push(text.slice(lastIndex, match.start));
    }
    nodes.push(
      <a
        key={`lk-${key++}`}
        href={match.href}
        target={match.href.startsWith("http") ? "_blank" : undefined}
        rel={match.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent transition-colors cursor-pointer"
      >
        {match.label}
      </a>
    );
    lastIndex = match.end;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes.length ? nodes : [text];
};

export const ChatMessage: FC<Props> = ({ role, children }) => {
  const text = typeof children === "string" ? children : "";
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 text-[14.5px] leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "rounded-2xl rounded-br-sm bg-accent text-primary font-medium"
            : "rounded-2xl rounded-bl-sm text-primary-foreground/95"
        }`}
        style={
          isUser
            ? undefined
            : {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid hsl(var(--accent) / 0.18)",
              }
        }
      >
        {text ? linkify(text) : children}
      </div>
    </div>
  );
};

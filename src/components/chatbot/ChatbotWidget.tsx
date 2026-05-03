import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import {
  extractLeadInfo,
  newSessionId,
  sendLeadNotification,
  type ChatTurn,
  type LeadSnapshot,
} from "@/lib/chatbot/leadCapture";

const STORAGE_KEY = "apexify-chatbot-state-v1";
const GREETINGS = [
  "Hey — I'm Aria, here to help if you're poking around ApexifyLabs. What brought you in today?",
  "Hi there. I'm Aria, the assistant for the ApexifyLabs team. What are you trying to figure out?",
  "Hey, I'm Aria. Happy to help — what's on your mind?",
];

interface PersistedState {
  sessionId: string;
  turns: ChatTurn[];
  lead: LeadSnapshot;
  notifiedFirst: boolean;
  notifiedLead: boolean;
  isOpen: boolean;
}

const loadState = (): PersistedState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
};

const saveState = (state: PersistedState) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* noop — storage may be full or disabled */
  }
};

export const ChatbotWidget = () => {
  const initial = useMemo(() => loadState(), []);
  const [isOpen, setIsOpen] = useState<boolean>(initial?.isOpen ?? false);
  const [sessionId] = useState<string>(initial?.sessionId ?? newSessionId());
  const [turns, setTurns] = useState<ChatTurn[]>(() => {
    if (initial?.turns?.length) return initial.turns;
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    return [{ role: "assistant", content: greeting, at: Date.now() }];
  });
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [hasUnread, setHasUnread] = useState(false);

  const notifiedFirstRef = useRef<boolean>(initial?.notifiedFirst ?? false);
  const notifiedLeadRef = useRef<boolean>(initial?.notifiedLead ?? false);
  const leadRef = useRef<LeadSnapshot>(initial?.lead ?? {});
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    saveState({
      sessionId,
      turns,
      lead: leadRef.current,
      notifiedFirst: notifiedFirstRef.current,
      notifiedLead: notifiedLeadRef.current,
      isOpen,
    });
  }, [sessionId, turns, isOpen]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [turns, streamingText, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const fireLeadEmail = useCallback(
    async (reason: "first_message" | "lead_captured", currentTurns: ChatTurn[]) => {
      try {
        await sendLeadNotification({
          reason,
          turns: currentTurns,
          lead: leadRef.current,
          sessionId,
        });
      } catch (err) {
        console.warn("[chatbot] lead notification failed:", err);
      }
    },
    [sessionId]
  );

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || isTyping) return;

    const userTurn: ChatTurn = { role: "user", content: text, at: Date.now() };
    const nextTurns = [...turns, userTurn];
    setTurns(nextTurns);
    setDraft("");
    setIsTyping(true);
    setStreamingText("");

    const previousLead = leadRef.current;
    const refreshedLead = extractLeadInfo(nextTurns);
    leadRef.current = refreshedLead;

    if (!notifiedFirstRef.current) {
      notifiedFirstRef.current = true;
      void fireLeadEmail("first_message", nextTurns);
    }
    if (!notifiedLeadRef.current && refreshedLead.email && refreshedLead.email !== previousLead.email) {
      notifiedLeadRef.current = true;
      void fireLeadEmail("lead_captured", nextTurns);
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextTurns.map((t) => ({ role: t.role, content: t.content })),
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`Chat API responded ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        acc += chunk;
        setStreamingText(acc);
      }

      const final = acc.trim() || "Sorry — I didn't catch that. Could you try rephrasing?";
      setTurns((prev) => [...prev, { role: "assistant", content: final, at: Date.now() }]);
      setStreamingText("");

      if (!isOpen) setHasUnread(true);
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") return;
      console.error("[chatbot] send failed:", err);
      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hmm, something glitched on my end. The fastest path is probably a quick note to contact@apexifylabs.com — the team will pick it up from there.",
          at: Date.now(),
        },
      ]);
      setStreamingText("");
    } finally {
      setIsTyping(false);
    }
  }, [draft, isTyping, turns, fireLeadEmail, isOpen]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="launcher"
            type="button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 px-5 py-3.5 rounded-full text-primary font-semibold text-[14px] gradient-accent glow-accent hover-lift cursor-pointer shadow-elevated md:bottom-6 md:right-6"
            aria-label="Open chat with Aria"
          >
            <MessageCircle size={18} strokeWidth={2.4} />
            <span className="hidden sm:inline">Chat with Aria</span>
            <span className="sm:hidden">Chat</span>
            {hasUnread && (
              <span className="ml-1 inline-block h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[60] flex flex-col overflow-hidden rounded-2xl shadow-elevated md:inset-x-auto md:right-6 md:bottom-6 md:w-[400px]"
            style={{
              maxHeight: "min(640px, calc(100vh - 24px))",
              height: "min(640px, calc(100vh - 24px))",
              background:
                "linear-gradient(180deg, hsl(210 100% 12%) 0%, hsl(210 100% 9%) 100%)",
              border: "1px solid hsl(var(--accent) / 0.32)",
              boxShadow:
                "0 24px 60px hsl(210 100% 4% / 0.55), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
            }}
            role="dialog"
            aria-label="Chat with Aria"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid hsl(var(--accent) / 0.18)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center h-9 w-9 rounded-full gradient-accent"
                  style={{ boxShadow: "0 0 18px hsl(var(--accent) / 0.45)" }}
                >
                  <Sparkles size={16} className="text-primary" strokeWidth={2.4} />
                </div>
                <div className="leading-tight">
                  <div className="text-[15px] font-semibold text-primary-foreground">Aria</div>
                  <div className="flex items-center gap-1.5">
                    <span className="block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-primary-foreground/65">
                      ApexifyLabs · usually replies in seconds
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Minimize chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chatbot-scroll">
              {turns.map((t, i) => (
                <ChatMessage key={i} role={t.role}>
                  {t.content}
                </ChatMessage>
              ))}
              {isTyping && !streamingText && <TypingIndicator />}
              {streamingText && (
                <ChatMessage role="assistant">
                  {streamingText}
                  <span className="inline-block ml-0.5 w-[2px] h-[1em] align-[-0.15em] bg-accent/80 animate-pulse" />
                </ChatMessage>
              )}
            </div>

            {/* Input */}
            <div className="px-3 pt-2 pb-3" style={{ borderTop: "1px solid hsl(var(--accent) / 0.18)" }}>
              <div
                className="flex items-end gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid hsl(var(--accent) / 0.22)",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type your message…"
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-[14.5px] text-primary-foreground placeholder:text-primary-foreground/40 outline-none max-h-32 leading-relaxed py-1.5"
                  style={{ minHeight: "24px" }}
                  disabled={isTyping}
                />
                <button
                  type="button"
                  onClick={() => void send()}
                  disabled={!draft.trim() || isTyping}
                  className="flex items-center justify-center h-9 w-9 rounded-lg gradient-accent text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  aria-label="Send message"
                >
                  <Send size={15} strokeWidth={2.4} />
                </button>
              </div>
              <div className="mt-2 px-1 text-center text-[10.5px] text-primary-foreground/40">
                email at{" "}
                <a
                  href="mailto:contact@apexifylabs.com"
                  className="text-accent/80 hover:text-accent transition-colors cursor-pointer"
                >
                  contact@apexifylabs.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

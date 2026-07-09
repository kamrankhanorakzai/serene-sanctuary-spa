"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport, type UIMessage } from "ai";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const STORAGE_KEY = "anaya-spa-chat-messages";
const CHAT_ID = "anaya-spa-concierge";

// ---------------------------------------------------------------------------
// n8n webhook integration — live chat routed through the Anaya Spa n8n agent.
// The webhook is expected to accept { chatInput, sessionId, history } and
// return plain text or JSON such as { output } / { text } / { message }.
// ---------------------------------------------------------------------------
const N8N_WEBHOOK_URL = "https://n8n-postgres.aiconsultix.com/webhook/spa-chat";
const BUSY_MESSAGE =
  "Our system is a little busy right now — we'll get back to you in a moment. In the meantime, feel free to call us at (310) 555-0199 or browse our Services and Pricing pages.";

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  const key = "anaya-spa-chat-session-id";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(key, id);
  }
  return id;
}

function extractText(payload: unknown): string {
  if (payload == null) return "";
  if (typeof payload === "string") return payload;
  if (Array.isArray(payload)) return payload.map(extractText).filter(Boolean).join("\n\n");
  if (typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const key of ["output", "text", "message", "response", "reply", "answer", "content"]) {
      const v = obj[key];
      if (typeof v === "string" && v.trim()) return v;
      if (v && typeof v === "object") {
        const nested = extractText(v);
        if (nested) return nested;
      }
    }
  }
  return "";
}

function textToStream(text: string, chunkWords = 3, delay = 35): Response {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  const stream = new ReadableStream({
    start(controller) {
      let i = 0;
      const tick = () => {
        if (i >= words.length) {
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(words.slice(i, i + chunkWords).join("")));
        i += chunkWords;
        setTimeout(tick, delay);
      };
      tick();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

async function n8nFetch(_input: string | URL | Request, init?: RequestInit): Promise<Response> {
  try {
    const body = init?.body ? JSON.parse(init.body as string) : { messages: [] };
    const messages: UIMessage[] = Array.isArray(body.messages) ? body.messages : [];
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const chatInput =
      lastUser?.parts
        ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join(" ")
        .trim() ?? "";

    const history = messages.slice(-20).map((m) => ({
      role: m.role,
      content:
        m.parts
          ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text)
          .join(" ") ?? "",
    }));

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatInput,
        message: chatInput,
        sessionId: getSessionId(),
        history,
      }),
    });

    if (!res.ok) {
      console.error("n8n webhook error:", res.status);
      return textToStream(BUSY_MESSAGE);
    }

    const contentType = res.headers.get("content-type") ?? "";
    let text = "";
    if (contentType.includes("application/json")) {
      text = extractText(await res.json());
    } else {
      const raw = await res.text();
      try {
        text = extractText(JSON.parse(raw)) || raw;
      } catch {
        text = raw;
      }
    }

    if (!text.trim()) text = BUSY_MESSAGE;
    return textToStream(text);
  } catch (err) {
    console.error("n8n webhook exception:", err);
    return textToStream(BUSY_MESSAGE);
  }
}

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UIMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: UIMessage[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // localStorage can be disabled in private mode; fail silently.
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMessages] = useState<UIMessage[]>(loadMessages);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: N8N_WEBHOOK_URL,
        fetch: n8nFetch,
      }),
    [],
  );

  const { messages, sendMessage, status, setMessages } = useChat({
    id: CHAT_ID,
    messages: initialMessages,
    transport,
    onFinish: ({ messages: finalMessages }) => {
      saveMessages(finalMessages);
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  // Persist messages on every change (user messages, streaming updates, etc.).
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  // Focus textarea whenever the panel opens and after a message is sent.
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => textareaRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, status, messages.length]);

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const text = message.text.trim();
      if (!text || status === "submitted" || status === "streaming") return;
      sendMessage({ text });
    },
    [sendMessage, status],
  );

  const handleClear = useCallback(() => {
    setMessages([]);
    saveMessages([]);
  }, [setMessages]);

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Ask us anything"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="group fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full bg-jade-deep px-5 py-4 text-ivory shadow-luxe transition-all duration-500 hover:bg-gold hover:text-jade-deep sm:right-8 sm:bottom-8"
      >
        <span className="grid h-6 w-6 place-items-center">
          <MessageCircle size={20} />
        </span>
        <span className="text-[0.72rem] uppercase tracking-[0.22em]">Ask us anything</span>
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold ring-2 ring-ivory shimmer" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Anaya Spa Concierge Chat"
          aria-modal="false"
          className="fixed right-5 bottom-24 z-50 flex w-[calc(100vw-2.5rem)] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-luxe sm:right-8 sm:bottom-28"
          style={{ height: "min(640px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-jade-deep px-4 py-3 text-ivory">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-ivory/10">
                <img
                  src="/favicon.png"
                  alt="Anaya Spa concierge"
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <p className="font-serif text-base">Spa Concierge</p>
                <p className="text-[0.65rem] uppercase tracking-widest text-ivory/70">
                  Ask us anything
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full p-2 text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory"
                title="New conversation"
                aria-label="New conversation"
              >
                <span className="sr-only">New conversation</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Conversation */}
          <Conversation className="flex-1 bg-background">
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={
                    <img
                      src="/favicon.png"
                      alt="Anaya Spa lotus"
                      className="h-7 w-7 object-contain opacity-80"
                    />
                  }
                  title="Welcome to Anaya Spa"
                  description="Ask about our massages, facials, packages, or booking hours. Our concierge is here to help."
                />
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent>
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return <MessageResponse key={index}>{part.text}</MessageResponse>;
                        }
                        return null;
                      })}
                    </MessageContent>
                  </Message>
                ))
              )}
              {isLoading && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer className="text-sm text-muted-foreground">
                      Concierge is typing…
                    </Shimmer>
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          {/* Composer */}
          <div className="border-t border-border bg-card p-4">
            <PromptInput onSubmit={handleSubmit} className="flex flex-col gap-2">
              <PromptInputTextarea
                ref={textareaRef}
                placeholder="Type your question…"
                rows={1}
                className="min-h-[44px] resize-none rounded-xl border border-input bg-background px-3 py-3 text-sm focus-visible:ring-1 focus-visible:ring-ring"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit
                  status={status}
                  disabled={isLoading}
                  className="rounded-full bg-jade-deep text-ivory hover:bg-gold hover:text-jade-deep disabled:opacity-50"
                >
                  <Send size={16} />
                </PromptInputSubmit>
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 text-center text-[0.65rem] text-muted-foreground">
              Responses are simulated until connected to your n8n RAG assistant.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

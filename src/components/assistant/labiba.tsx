"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  lessonId?: string | null;
  grade?: number;
  lessonTitle?: string;
  domain?: string;
};

type AssistantResponse = {
  reply: string;
  lessonId?: string | null;
  grade?: number;
  domain?: string;
  lessonTitle?: string;
};

const SUGGESTIONS = [
  "ما هي مكونات الحاسوب؟",
  "ما هو نظام التشغيل؟",
  "ماذا تعني الشبكة المحلية LAN؟",
  "كيف أحمي نفسي من الجرائم الإلكترونية؟",
  "ما هو المتغير في سكراتش؟",
  "ما هو وسم الصورة في HTML؟",
];

export function Labiba() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "أهلاً! أنا لبيبة، مساعدتك الذكية في مادة المهارات الرقمية 🤖💙 اسألني عن أي موضوع في دروسك وسأساعدك على فهمه.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput("");
    const userMsg: ChatMessage = { role: "user", text: q };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = (await res.json()) as AssistantResponse;
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data.reply,
          lessonId: data.lessonId,
          grade: data.grade,
          lessonTitle: data.lessonTitle,
          domain: data.domain,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى من فضلك. 🙏" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 left-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-2xl text-white shadow-xl hover:scale-105 transition-transform"
        aria-label="المساعدة الذكية لبيبة"
      >
        {open ? "✕" : "🤖"}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          dir="rtl"
          className="fixed bottom-20 left-5 z-[60] flex h-[520px] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-fuchsia-600 to-purple-700 px-4 py-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">🤖</span>
            <div>
              <div className="font-bold">لبيبة</div>
              <div className="text-xs text-white/80">المساعدة الذكية للمهارات الرقمية</div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="flex gap-2 overflow-x-auto border-b border-gray-100 px-3 py-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="whitespace-nowrap rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700 hover:bg-purple-100 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-3 py-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"} items-end gap-2`}
              >
                {msg.role === "assistant" && (
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-sm">
                    🤖
                  </span>
                )}
                <div
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                  {msg.role === "assistant" && msg.lessonId && (
                    <Link
                      href={`/lesson/${msg.lessonId}`}
                      className="mt-2 flex items-center gap-1 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100"
                      onClick={() => setOpen(false)}
                    >
                      📖 افتح الدرس: {msg.lessonTitle}
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-100 text-sm">🤖</span>
                <div className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">
                  <span className="animate-pulse">لبيبة تفكر…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-200 bg-white p-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="اكتب سؤالك هنا…"
              className="h-10 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:brightness-110 disabled:opacity-50"
              aria-label="إرسال"
            >
              <svg className="h-5 w-5 -scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

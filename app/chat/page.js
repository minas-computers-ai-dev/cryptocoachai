"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

const QUICK_TOPICS = [
  { emoji: "🪙", label: "What is cryptocurrency?" },
  { emoji: "💰", label: "How do I buy my first Bitcoin?" },
  { emoji: "🔐", label: "What is a crypto wallet?" },
  { emoji: "⚠️", label: "How do I spot a crypto scam?" },
  { emoji: "🛡️", label: "What are the top security rules?" },
  { emoji: "📊", label: "What is blockchain?" },
];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = getSupabase();
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState("");
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, []);
  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { router.replace("/login"); return; }
      setUserName(data.session.user.user_metadata?.full_name || "");
      setLoading(false);
    });
  }, [supabase, router]);

  const handleLogout = async () => { if (supabase) await supabase.auth.signOut(); router.replace("/"); };

  const sendMessage = async (messageText) => {
    const text = messageText || input.trim();
    if (!text || sending) return;
    setInput(""); setSending(true); setChatError("");
    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => prev.slice(0, -1));
      setChatError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally { setSending(false); inputRef.current?.focus(); }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const formatMessage = (content) => {
    const formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-purple-900/50 px-1.5 py-0.5 rounded text-yellow-300 text-sm sm:text-base">$1</code>')
      .replace(/^- (.*)/gm, "• $1")
      .replace(/^(\d+)\. /gm, "$1. ");
    return formatted.split("\n").map((line, i) => (
      <span key={i}><span dangerouslySetInnerHTML={{ __html: line }} />{i < content.split("\n").length - 1 && <br />}</span>
    ));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0c0a1a] flex items-center justify-center px-5">
      <div className="flex flex-col items-center gap-4 text-slate-300">
        <svg className="animate-spin w-10 h-10 text-purple-400" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
        <p className="text-lg sm:text-xl font-semibold">Loading your dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0c0a1a] flex flex-col">
      {/* ── Header ── */}
      <header className="bg-[#110e20] border-b-2 border-purple-800/40 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <Link href="/" className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20" aria-label="Home">
                <span className="text-base sm:text-xl">👑</span>
              </Link>
              <div className="min-w-0">
                <p className="text-sm sm:text-lg font-bold text-white truncate leading-tight">MinasCoach</p>
                <p className="text-xs text-slate-400 truncate leading-tight">Hi, {userName || "there"}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="inline-flex items-center justify-center h-9 sm:h-11 px-3.5 sm:px-5 bg-purple-900/40 hover:bg-purple-800/50 text-slate-200 font-semibold text-xs sm:text-sm rounded-xl border-2 border-purple-700/40 transition-colors flex-shrink-0 whitespace-nowrap">
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* ── Chat area ── */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col px-3 sm:px-6 py-3 sm:py-6 min-w-0">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto chat-container space-y-4 sm:space-y-6 pb-4" role="log" aria-label="Chat messages" aria-live="polite">
          {messages.length === 0 ? (
            /* ── Empty / Welcome ── */
            <div className="h-full flex flex-col items-center justify-center text-center px-2 py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-5 sm:mb-6 shadow-xl shadow-purple-500/20" aria-hidden="true">
                <span className="text-3xl sm:text-4xl">👑</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2 sm:mb-3">Welcome, {userName || "there"}!</h2>
              <p className="text-sm sm:text-base text-slate-300 mb-8 sm:mb-10 max-w-md leading-relaxed">I&apos;m here to help you understand cryptocurrency in plain English. Ask me anything — no question is too basic!</p>
              <div className="w-full max-w-lg">
                <p className="text-sm sm:text-base text-slate-400 mb-3 sm:mb-4 font-semibold">Tap a topic to get started:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {QUICK_TOPICS.map((topic, i) => (
                    <button key={i} onClick={() => sendMessage(topic.label)} className="bg-[#110e20] hover:bg-purple-950/60 border-2 border-purple-800/40 hover:border-purple-600/60 rounded-xl px-4 py-3 sm:py-3.5 text-left text-sm sm:text-base text-slate-200 transition-all flex items-center gap-2.5 sm:gap-3 font-medium">
                      <span className="text-lg sm:text-xl flex-shrink-0" aria-hidden="true">{topic.emoji}</span>
                      <span className="leading-snug">{topic.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ── Messages ── */
            messages.map((message, i) => (
              <div key={i} className={`flex gap-2 sm:gap-3 message-appear ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/15 mt-0.5" aria-hidden="true">
                    <span className="text-sm sm:text-lg">👑</span>
                  </div>
                )}
                <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 ${message.role === "user" ? "bg-yellow-500 text-[#0c0a1a] rounded-br-md" : "bg-[#110e20] text-slate-200 border-2 border-purple-800/40 rounded-bl-md"}`}>
                  <div className={`text-sm sm:text-base leading-relaxed ${message.role === "user" ? "font-semibold" : "whitespace-pre-wrap"}`}>
                    {message.role === "assistant" ? formatMessage(message.content) : message.content}
                  </div>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-900/50 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-sm sm:text-lg">👤</span>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Typing indicator */}
          {sending && (
            <div className="flex gap-2 sm:gap-3 message-appear" aria-label="MinasCoach is thinking…">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0" aria-hidden="true"><span className="text-sm sm:text-lg">👑</span></div>
              <div className="bg-[#110e20] border-2 border-purple-800/40 rounded-2xl rounded-bl-md px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-400 typing-dot" /><div className="w-2.5 h-2.5 rounded-full bg-purple-400 typing-dot" /><div className="w-2.5 h-2.5 rounded-full bg-purple-400 typing-dot" /></div>
                <span className="text-sm text-slate-400">Thinking…</span>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {chatError && (
          <div className="bg-red-900/40 border-2 border-red-500 rounded-xl p-3 sm:p-4 mb-2 text-red-200 text-sm sm:text-base font-medium" role="alert">
            <span className="font-bold">⚠ Error:&ensp;</span>{chatError}
          </div>
        )}

        {/* ── Input — WhatsApp / Telegram style ── */}
        <div className="pb-2 pt-2 sm:pt-3 flex-shrink-0">
          <div className="flex items-end gap-2 sm:gap-2.5">
            <label htmlFor="chat-input" className="sr-only">Type your question about crypto</label>
            <div className="flex-1 bg-[#1a1630] border border-purple-700/30 rounded-3xl px-4 sm:px-5 py-2 flex items-end min-h-[44px] sm:min-h-[48px]">
              <textarea ref={inputRef} id="chat-input" value={input} onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }} onKeyDown={handleKeyDown} placeholder="Type a message…" rows={1} className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 resize-none outline-none leading-relaxed py-0.5" style={{ minHeight: "24px", maxHeight: "120px" }} disabled={sending} />
            </div>
            <button onClick={() => sendMessage()} disabled={!input.trim() || sending} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 shadow-lg shadow-yellow-500/20" aria-label="Send message">
              <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-600 text-center mt-1.5 select-none">Educational only — not financial advice</p>
        </div>
      </div>
    </div>
  );
}

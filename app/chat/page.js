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
    const formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>').replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/`(.*?)`/g, '<code class="bg-purple-900/50 px-1.5 py-0.5 rounded text-yellow-300 text-base">$1</code>').replace(/^- (.*)/gm, "• $1").replace(/^(\d+)\. /gm, "$1. ");
    return formatted.split("\n").map((line, i) => (<span key={i}><span dangerouslySetInnerHTML={{ __html: line }} />{i < content.split("\n").length - 1 && <br />}</span>));
  };

  if (loading) return (<div className="min-h-screen bg-[#0c0a1a] flex items-center justify-center px-5"><div className="flex flex-col items-center gap-4 text-slate-300"><svg className="animate-spin w-10 h-10 text-purple-400" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg><p className="text-xl font-semibold">Loading your dashboard…</p></div></div>);

  return (
    <div className="min-h-screen bg-[#0c0a1a] flex flex-col">
      <header className="bg-[#110e20] border-b-2 border-purple-800/40 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Link href="/" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20" aria-label="Home"><span className="text-lg sm:text-2xl">👑</span></Link>
            <div className="min-w-0"><h1 className="text-base sm:text-xl font-bold text-white truncate">MinasCoach</h1><p className="text-xs sm:text-sm text-slate-400 truncate">Hi, {userName || "there"}</p></div>
          </div>
          <button onClick={handleLogout} className="bg-purple-900/40 hover:bg-purple-800/50 text-slate-200 font-semibold text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border-2 border-purple-700/40 transition-colors flex-shrink-0" style={{ minHeight: "44px" }}>Log Out</button>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col px-3 sm:px-6 py-3 sm:py-6">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto chat-container space-y-4 sm:space-y-5 pb-4" role="log" aria-label="Chat messages" aria-live="polite">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-2 py-6 sm:py-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6 sm:mb-8 shadow-xl shadow-purple-500/20" aria-hidden="true"><span className="text-4xl sm:text-5xl">👑</span></div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4">Welcome, {userName || "there"}!</h2>
              <p className="text-base sm:text-xl text-slate-300 mb-8 sm:mb-10 max-w-md leading-relaxed">I&apos;m here to help you understand cryptocurrency in plain English. Ask me anything — no question is too basic!</p>
              <div className="w-full max-w-lg">
                <p className="text-base text-slate-400 mb-4 font-semibold">Tap a topic to get started:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUICK_TOPICS.map((topic, i) => (<button key={i} onClick={() => sendMessage(topic.label)} className="bg-[#110e20] hover:bg-purple-950/60 border-2 border-purple-800/40 hover:border-purple-600/60 rounded-xl px-4 sm:px-5 text-left text-base text-slate-200 transition-all flex items-center gap-3 font-medium" style={{ minHeight: "56px" }}><span className="text-xl sm:text-2xl flex-shrink-0" aria-hidden="true">{topic.emoji}</span><span>{topic.label}</span></button>))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, i) => (
              <div key={i} className={`flex gap-2.5 sm:gap-4 message-appear ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && (<div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/15" aria-hidden="true"><span className="text-lg sm:text-2xl">👑</span></div>)}
                <div className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 sm:px-6 py-3 sm:py-4 ${message.role === "user" ? "bg-yellow-500 text-[#0c0a1a]" : "bg-[#110e20] text-slate-200 border-2 border-purple-800/40"}`}>
                  <div className={`text-base sm:text-lg leading-relaxed whitespace-pre-wrap ${message.role === "user" ? "font-semibold" : ""}`}>{message.role === "assistant" ? formatMessage(message.content) : message.content}</div>
                </div>
                {message.role === "user" && (<div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-purple-900/50 flex items-center justify-center flex-shrink-0" aria-hidden="true"><span className="text-lg sm:text-2xl">👤</span></div>)}
              </div>
            ))
          )}
          {sending && (<div className="flex gap-2.5 sm:gap-4 message-appear" aria-label="MinasCoach is thinking…"><div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0" aria-hidden="true"><span className="text-lg sm:text-2xl">👑</span></div><div className="bg-[#110e20] border-2 border-purple-800/40 rounded-2xl px-5 sm:px-6 py-3 sm:py-4 flex items-center"><div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-purple-400 typing-dot" /><div className="w-3 h-3 rounded-full bg-purple-400 typing-dot" /><div className="w-3 h-3 rounded-full bg-purple-400 typing-dot" /></div><span className="ml-4 text-base text-slate-400">Thinking…</span></div></div>)}
        </div>

        {chatError && (<div className="bg-red-900/40 border-2 border-red-500 rounded-xl p-4 mb-3 text-red-200 text-base font-medium" role="alert"><span className="font-bold">⚠ Error:&ensp;</span>{chatError}</div>)}

        <div className="bg-[#110e20] border-2 border-purple-800/40 rounded-2xl p-3 sm:p-5 mt-3">
          <div className="flex gap-2.5 sm:gap-4 items-end">
            <label htmlFor="chat-input" className="sr-only">Type your question about crypto</label>
            <textarea ref={inputRef} id="chat-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your question here…" rows={2} className="flex-1 bg-[#0c0a1a] border-2 border-purple-700/40 rounded-xl px-4 sm:px-5 py-3 text-base sm:text-lg text-white placeholder-slate-500 resize-none transition-colors hover:border-purple-600/60" style={{ minHeight: "56px", maxHeight: "160px" }} disabled={sending} />
            <button onClick={() => sendMessage()} disabled={!input.trim() || sending} className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 px-4 sm:px-7" style={{ minHeight: "56px" }} aria-label="Send message">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              <span className="hidden sm:inline text-lg">Send</span>
            </button>
          </div>
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-purple-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs sm:text-sm text-slate-400 font-medium">⚠️ Educational information only — not financial advice</p>
          </div>
        </div>
      </div>
    </div>
  );
}

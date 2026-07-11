"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  Loader2,
  LogOut,
  MessageCircle,
  Shield,
  BookOpen,
  AlertTriangle,
  Wallet,
  MessageSquare,
  ChevronRight,
  X,
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();

        if (!data.authenticated) {
          router.push("/login");
          return;
        }

        setUser(data.user);

        const chatResponse = await fetch("/api/chat");
        if (chatResponse.ok) {
          const chatData = await chatResponse.json();
          setMessages(chatData.messages || []);
        }
      } catch {
        router.push("/login");
      } finally {
        setInitialLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    const tempUserMsg: Message = {
      id: Date.now(),
      role: "user",
      content: userMessage,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMsg: Message = {
          id: Date.now() + 1,
          role: "assistant",
          content: data.response,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-[var(--primary)] animate-spin" />
        <p className="text-[1.1rem] text-[var(--text-secondary)]">
          Loading your dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* ── Header ── */}
      <header className="border-b-2 border-[var(--border)] bg-[var(--bg)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFB020] to-[#FF8C00] flex items-center justify-center">
                <span className="text-[var(--primary-text)] font-extrabold text-base">
                  CC
                </span>
              </div>
              <span className="text-[1.2rem] font-bold text-[var(--text)] hidden sm:block">
                CryptoCoach AI
              </span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[1rem] text-[var(--text-secondary)] hidden md:block">
                Hi, {user?.name}
              </span>

              <button
                onClick={() => setShowFeedback(true)}
                className="inline-flex items-center justify-center min-h-[52px] min-w-[52px] px-4 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--surface)] rounded-xl transition-colors gap-2"
                aria-label="Give feedback"
              >
                <MessageSquare className="w-6 h-6" />
                <span className="hidden sm:inline text-[1rem] font-medium">
                  Feedback
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center min-h-[52px] min-w-[52px] px-4 text-[var(--text-secondary)] hover:text-[var(--danger)] hover:bg-[var(--surface)] rounded-xl transition-colors gap-2"
                aria-label="Log out"
              >
                <LogOut className="w-6 h-6" />
                <span className="hidden sm:inline text-[1rem] font-medium">
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-[340px] border-r-2 border-[var(--border)] p-6 overflow-y-auto">
          <h2 className="text-[1.2rem] font-bold text-[var(--text)] mb-3">
            Quick Start
          </h2>
          <p className="text-[1rem] text-[var(--text-secondary)] mb-6 leading-relaxed">
            Click any topic below, or type your own question in the chat.
          </p>

          <div className="space-y-3">
            <QuickTopic
              icon={<BookOpen className="w-6 h-6" />}
              title="What is cryptocurrency?"
              onClick={handleQuickQuestion}
            />
            <QuickTopic
              icon={<Wallet className="w-6 h-6" />}
              title="How do I buy my first Bitcoin?"
              onClick={handleQuickQuestion}
            />
            <QuickTopic
              icon={<Shield className="w-6 h-6" />}
              title="What's a seed phrase?"
              onClick={handleQuickQuestion}
            />
            <QuickTopic
              icon={<AlertTriangle className="w-6 h-6" />}
              title="How do I spot a crypto scam?"
              onClick={handleQuickQuestion}
            />
          </div>

          <div className="mt-8 p-5 bg-[var(--surface)] rounded-xl border-2 border-[var(--border)]">
            <h3 className="text-[1.05rem] font-bold text-[var(--text)] mb-2">
              💡 Scam Check Tip
            </h3>
            <p className="text-[1rem] text-[var(--text-secondary)] leading-relaxed">
              If someone contacts you about a crypto opportunity, describe the
              situation to me and I&apos;ll help you determine if it&apos;s a
              scam.
            </p>
          </div>
        </aside>

        {/* ── Main Chat Area ── */}
        <main id="main-content" className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.length === 0 ? (
                <WelcomeMessage
                  userName={user?.name || "there"}
                  onQuickQuestion={handleQuickQuestion}
                />
              ) : (
                messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))
              )}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-4 animate-fade-in-up">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFB020] to-[#FF8C00] flex items-center justify-center flex-shrink-0">
                    <span className="text-[var(--primary-text)] text-sm font-extrabold">
                      CC
                    </span>
                  </div>
                  <div className="bg-[var(--surface-raised)] border-2 border-[var(--border)] rounded-2xl rounded-bl-md px-6 py-4">
                    <div className="flex gap-2">
                      <span
                        className="w-3 h-3 bg-[var(--text-secondary)] rounded-full"
                        style={{
                          animation: "pulse-dot 1.2s infinite",
                          animationDelay: "0ms",
                        }}
                      />
                      <span
                        className="w-3 h-3 bg-[var(--text-secondary)] rounded-full"
                        style={{
                          animation: "pulse-dot 1.2s infinite",
                          animationDelay: "200ms",
                        }}
                      />
                      <span
                        className="w-3 h-3 bg-[var(--text-secondary)] rounded-full"
                        style={{
                          animation: "pulse-dot 1.2s infinite",
                          animationDelay: "400ms",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* ── Input Area ── */}
          <div className="border-t-2 border-[var(--border)] p-4 sm:p-6 bg-[var(--bg)]">
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto"
            >
              <div className="flex gap-3">
                <label htmlFor="chat-input" className="sr-only">
                  Type your question about crypto
                </label>
                <input
                  ref={inputRef}
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question here…"
                  className="flex-1 min-h-[56px] px-5 text-[1.1rem] bg-[var(--surface)] border-2 border-[var(--border)] rounded-xl text-[var(--text)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[var(--focus-ring)] transition-all"
                  disabled={loading}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="min-h-[56px] min-w-[56px] px-5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-[var(--primary-text)] rounded-xl transition-colors flex items-center justify-center"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
              <p className="mt-3 text-[0.9rem] text-[var(--text-tertiary)] text-center">
                CryptoCoach AI is for education only. Not financial advice.
              </p>
            </form>
          </div>
        </main>
      </div>

      {/* ── Feedback Modal ── */}
      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} />
      )}
    </div>
  );
}

/* ================================================================
   Sub-components
   ================================================================ */

function QuickTopic({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: (q: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(title)}
      className="w-full flex items-center gap-4 min-h-[56px] p-4 bg-[var(--surface)] hover:bg-[var(--surface-raised)] rounded-xl border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors text-left group"
    >
      <span className="text-[var(--primary)]">{icon}</span>
      <span className="text-[1rem] text-[var(--text)] flex-1 leading-snug">
        {title}
      </span>
      <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--primary)] transition-colors" />
    </button>
  );
}

function WelcomeMessage({
  userName,
  onQuickQuestion,
}: {
  userName: string;
  onQuickQuestion: (q: string) => void;
}) {
  return (
    <div className="text-center py-8 sm:py-14">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#FFB020] to-[#FF8C00] flex items-center justify-center mx-auto mb-6">
        <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--primary-text)]" />
      </div>
      <h2 className="text-[1.5rem] sm:text-[1.85rem] font-extrabold text-[var(--text)] mb-3">
        Hi {userName}, ready to learn?
      </h2>
      <p className="text-[1.1rem] text-[var(--text-secondary)] mb-10 max-w-md mx-auto leading-relaxed">
        I&apos;m your crypto education assistant. Ask me anything about
        cryptocurrency, security, wallets, or scams.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        <SuggestionButton
          text="What is cryptocurrency?"
          onClick={onQuickQuestion}
        />
        <SuggestionButton
          text="How do I buy Bitcoin?"
          onClick={onQuickQuestion}
        />
        <SuggestionButton
          text="What's a seed phrase?"
          onClick={onQuickQuestion}
        />
        <SuggestionButton
          text="Is this a scam?"
          onClick={onQuickQuestion}
        />
      </div>
    </div>
  );
}

function SuggestionButton({
  text,
  onClick,
}: {
  text: string;
  onClick: (q: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(text)}
      className="min-h-[56px] px-5 py-4 bg-[var(--surface)] hover:bg-[var(--surface-raised)] rounded-xl border-2 border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)] text-[1.05rem] font-medium transition-colors"
    >
      {text}
    </button>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 animate-fade-in-up ${isUser ? "justify-end" : ""}`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFB020] to-[#FF8C00] flex items-center justify-center flex-shrink-0">
          <span className="text-[var(--primary-text)] text-sm font-extrabold">
            CC
          </span>
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-5 py-4 rounded-2xl ${
          isUser
            ? "bg-[var(--primary)] text-[var(--primary-text)] rounded-br-md"
            : "bg-[var(--surface-raised)] text-[var(--text)] rounded-bl-md border-2 border-[var(--border)]"
        }`}
      >
        <div
          className="message-content text-[1.05rem] leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: isUser
              ? escapeHtml(message.content)
              : formatMessage(message.content),
          }}
        />
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-11 h-11 rounded-xl bg-[var(--surface-raised)] border-2 border-[var(--border)] flex items-center justify-center flex-shrink-0">
          <span className="text-[var(--text)] text-sm font-bold">You</span>
        </div>
      )}
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatMessage(content: string): string {
  return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}

/* ── Feedback Modal ── */

function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [question, setQuestion] = useState("");
  const [wasHelpful, setWasHelpful] = useState("");
  const [confusion, setConfusion] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          wasHelpful,
          confusion,
          suggestions,
          rating,
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Feedback error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center p-0 sm:p-6 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-heading"
    >
      <div className="bg-[var(--surface)] sm:rounded-2xl border-t-2 sm:border-2 border-[var(--border)] w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-[var(--success-bg)] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <span className="text-[3rem]">✓</span>
              </div>
              <h3
                id="feedback-heading"
                className="text-[1.5rem] font-extrabold text-[var(--text)] mb-3"
              >
                Thank You!
              </h3>
              <p className="text-[1.1rem] text-[var(--text-secondary)] mb-8">
                Your feedback helps us improve.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center min-h-[56px] px-10 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-bold rounded-xl transition-colors text-[1.1rem]"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h3
                  id="feedback-heading"
                  className="text-[1.35rem] font-extrabold text-[var(--text)]"
                >
                  Send Feedback
                </h3>
                <button
                  onClick={onClose}
                  aria-label="Close feedback form"
                  className="w-12 h-12 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)] rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Question asked */}
                <div>
                  <label
                    htmlFor="fb-question"
                    className="block text-[1.05rem] font-semibold text-[var(--text)] mb-2"
                  >
                    What question did you ask?
                  </label>
                  <input
                    id="fb-question"
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    className="w-full min-h-[56px] px-5 text-[1.05rem] bg-[var(--bg)] border-2 border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[var(--focus-ring)] transition-all"
                  />
                </div>

                {/* Helpfulness */}
                <div>
                  <p className="text-[1.05rem] font-semibold text-[var(--text)] mb-3">
                    Was the answer helpful?
                  </p>
                  <div className="flex gap-3">
                    {["Yes", "Somewhat", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setWasHelpful(option.toLowerCase())}
                        className={`flex-1 min-h-[52px] rounded-xl border-2 font-semibold text-[1.05rem] transition-colors ${
                          wasHelpful === option.toLowerCase()
                            ? "bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-text)]"
                            : "bg-[var(--bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confusion */}
                <div>
                  <label
                    htmlFor="fb-confusion"
                    className="block text-[1.05rem] font-semibold text-[var(--text)] mb-2"
                  >
                    What confused you?{" "}
                    <span className="font-normal text-[var(--text-tertiary)]">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="fb-confusion"
                    value={confusion}
                    onChange={(e) => setConfusion(e.target.value)}
                    rows={3}
                    className="w-full px-5 py-4 text-[1.05rem] bg-[var(--bg)] border-2 border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[var(--focus-ring)] resize-none transition-all leading-relaxed"
                  />
                </div>

                {/* Suggestions */}
                <div>
                  <label
                    htmlFor="fb-suggestions"
                    className="block text-[1.05rem] font-semibold text-[var(--text)] mb-2"
                  >
                    What would you improve?{" "}
                    <span className="font-normal text-[var(--text-tertiary)]">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="fb-suggestions"
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    rows={3}
                    className="w-full px-5 py-4 text-[1.05rem] bg-[var(--bg)] border-2 border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[var(--focus-ring)] resize-none transition-all leading-relaxed"
                  />
                </div>

                {/* Rating 1-5 stars — simplified for older users */}
                <div>
                  <p className="text-[1.05rem] font-semibold text-[var(--text)] mb-3">
                    Overall rating
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        aria-label={`Rate ${n} out of 10`}
                        className={`w-11 h-11 rounded-xl text-[1rem] font-bold transition-colors ${
                          rating >= n
                            ? "bg-[var(--primary)] text-[var(--primary-text)]"
                            : "bg-[var(--bg)] text-[var(--text-secondary)] border-2 border-[var(--border)] hover:border-[var(--primary)]"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !question || !wasHelpful}
                  className="w-full min-h-[56px] bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-[var(--primary-text)] font-bold rounded-xl transition-colors flex items-center justify-center gap-3 text-[1.1rem]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Feedback"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

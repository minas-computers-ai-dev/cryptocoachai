"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

const STARTERS = [
  {
    label: "What is cryptocurrency?",
    sub: "A plain-English explanation of the basics",
    prompt: "What is cryptocurrency? Please explain it to me like I'm brand new to this.",
  },
  {
    label: "How do I stay safe?",
    sub: "The most important security rules first",
    prompt: "What are the most important things I should do to stay safe with crypto before I do anything else?",
  },
  {
    label: "What is a crypto wallet?",
    sub: "Where crypto is actually stored",
    prompt: "What is a crypto wallet and how does it work?",
  },
  {
    label: "What is an exchange?",
    sub: "Where people buy and sell crypto",
    prompt: "What is a crypto exchange, and how do I know if one is trustworthy?",
  },
];

const SCAM_PROMPT_PREFIX =
  "I want to check if something might be a scam. Here's the situation: ";

// Lightweight markdown → HTML renderer (no dependencies needed)
function renderMarkdown(text) {
  let html = text
    // Escape HTML entities first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Headings: ### heading → <h3>
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr/>')
    // Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic: *text* (but not inside words or list bullets)
    .replace(/(?<!\w)\*(?!\s)(.+?)(?<!\s)\*(?!\w)/g, '<em>$1</em>')
    // Inline code: `text`
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Unordered list items: * item or - item
    .replace(/^[\*\-] (.+)$/gm, '<li>$1</li>')
    // Numbered list items: 1. item
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    // Paragraphs: double newlines
    .replace(/\n\n+/g, '</p><p>')
    // Single newlines within paragraphs
    .replace(/\n/g, '<br/>');

  // Wrap in paragraph tags
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs and fix nesting
  html = html
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<p>\s*(<h[23]>)/g, '$1')
    .replace(/(<\/h[23]>)\s*<\/p>/g, '$1')
    .replace(/<p>\s*(<hr\/>)/g, '$1')
    .replace(/(<hr\/>)\s*<\/p>/g, '$1')
    .replace(/<p>\s*(<ul>)/g, '$1')
    .replace(/(<\/ul>)\s*<\/p>/g, '$1');

  return html;
}

function FormattedMessage({ content, role }) {
  if (role === "user") {
    return <>{content}</>;
  }
  return (
    <div
      className="msg-formatted"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}

export default function ChatPage() {
  const router = useRouter();
  const supabase = getSupabase();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  // Auth guard
  useEffect(() => {
    if (!supabase) {
      setCheckingAuth(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
      } else {
        const meta = data.session.user.user_metadata || {};
        setUserName(meta.full_name || "");
        setCheckingAuth(false);
      }
    });
  }, [supabase, router]);

  // Auto-scroll to the newest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setError(null);
    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("We couldn't reach the assistant. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleScamCheck() {
    setInput(SCAM_PROMPT_PREFIX);
    textareaRef.current?.focus();
  }

  async function handleSignOut() {
    if (supabase) await supabase.auth.signOut();
    router.replace("/");
  }

  if (checkingAuth) {
    return <div className="chat-loading">Getting things ready…</div>;
  }

  return (
    <div className="chat-shell">
      <header className="site-header">
        <div className="container">
          <Link href="/" className="brand">
            <span className="brand-mark" aria-hidden="true">₿</span>
            CryptoCoach
          </Link>
          <nav className="header-nav">
            <button className="btn-quiet" onClick={handleSignOut}>
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <main className="chat-main" ref={scrollRef}>
        <div className="container">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <h1>{userName ? `Hi ${userName}, what would you like to learn?` : "What would you like to learn?"}</h1>
              <p>
                Ask me anything about cryptocurrency — there are no silly
                questions here. Or pick a starting point below.
              </p>
              <div className="starter-grid">
                <button className="starter-card scam-check" onClick={handleScamCheck}>
                  <span className="starter-label">🛡️ Is this a scam?</span>
                  <span className="starter-sub">
                    Describe a message, offer, or situation and I&apos;ll help you evaluate it
                  </span>
                </button>
                {STARTERS.map((s) => (
                  <button
                    key={s.label}
                    className="starter-card"
                    onClick={() => sendMessage(s.prompt)}
                  >
                    <span className="starter-label">{s.label}</span>
                    <span className="starter-sub">{s.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role}`}>
                  <FormattedMessage content={m.content} role={m.role} />
                </div>
              ))}
              {sending && (
                <div className="msg assistant thinking">Thinking about your question…</div>
              )}
              {error && <div className="msg-error" role="alert">{error}</div>}
            </div>
          )}
        </div>
      </main>

      <div className="chat-composer">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="composer-row">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question here…"
                aria-label="Type your question"
                rows={2}
              />
              <button type="submit" className="btn btn-primary" disabled={sending || !input.trim()}>
                {sending ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
          <div className="composer-tools">
            {messages.length > 0 && (
              <button className="scam-quick-btn" onClick={handleScamCheck}>
                🛡️ Is this a scam?
              </button>
            )}
            <p className="composer-note">
              Educational only — not financial advice. For investment decisions,
              talk to a licensed professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const supabase = getSupabase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!supabase) return;
    setMessage(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setMessage({
        type: "error",
        text:
          error.message === "Invalid login credentials"
            ? "That email and password don't match our records. Please double-check and try again."
            : error.message,
      });
      return;
    }

    router.push("/chat");
  }

  return (
    <div className="auth-wrap">
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">₿</span>
          CryptoCoach
        </Link>
      </div>

      <div className="auth-card">
        <h1>Welcome back</h1>
        <p>Log in to continue learning.</p>

        {!supabase && (
          <div className="setup-notice">
            Login isn&apos;t configured yet. The site owner needs to add the
            Supabase environment variables (see the README).
          </div>
        )}

        {message && (
          <div className={`form-message ${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={loading || !supabase}
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link href="/register">Create a free account</Link>
        </p>
      </div>
    </div>
  );
}

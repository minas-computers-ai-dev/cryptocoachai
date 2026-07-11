"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = getSupabase();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // { type: 'error'|'success', text }
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!supabase) return;
    setMessage(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    setLoading(false);

    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }

    // If email confirmation is enabled in Supabase, there is no session yet.
    if (data.session) {
      router.push("/chat");
    } else {
      setMessage({
        type: "success",
        text: "Almost done! Check your email for a confirmation link, then come back and log in.",
      });
    }
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
        <h1>Create your account</h1>
        <p>Free to join. Your personal crypto guide is one step away.</p>

        {!supabase && (
          <div className="setup-notice">
            Registration isn&apos;t configured yet. The site owner needs to add
            the Supabase environment variables (see the README).
          </div>
        )}

        {message && (
          <div className={`form-message ${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Your first name</label>
            <input
              id="name"
              type="text"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            <label htmlFor="password">Choose a password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="field-hint">At least 8 characters. A short sentence works well.</p>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={loading || !supabase}
          >
            {loading ? "Creating your account…" : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

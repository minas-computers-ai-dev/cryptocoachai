"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please check the box to agree to the terms of use.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* ── Navigation ── */}
      <nav
        aria-label="Registration navigation"
        className="border-b-2 border-[var(--border)]"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link
              href="/"
              className="flex items-center gap-3 min-h-[52px] px-2 rounded-xl text-[var(--text)] hover:text-[var(--primary)] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFB020] to-[#FF8C00] flex items-center justify-center">
                  <span className="text-[var(--primary-text)] font-extrabold text-base">
                    CC
                  </span>
                </div>
                <span className="text-[1.2rem] font-bold hidden sm:block">
                  CryptoCoach AI
                </span>
              </div>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center min-h-[52px] px-5 text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium rounded-xl transition-colors text-[1rem]"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Form ── */}
      <main
        id="main-content"
        className="flex-1 flex items-start sm:items-center justify-center px-5 sm:px-8 py-10 sm:py-16"
      >
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[var(--text)] mb-3">
              Create Your Account
            </h1>
            <p className="text-[1.1rem] text-[var(--text-secondary)] leading-relaxed">
              Start learning crypto in plain English —&nbsp;it&rsquo;s free
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7" noValidate>
            {/* Error banner */}
            {error && (
              <div
                role="alert"
                className="p-5 bg-[var(--danger-bg)] border-2 border-[var(--danger)] rounded-xl"
              >
                <p className="text-[var(--danger)] text-[1.05rem] font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-[1.05rem] font-semibold text-[var(--text)] mb-2"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full min-h-[56px] px-5 text-[1.1rem] bg-[var(--surface)] border-2 border-[var(--border)] rounded-xl text-[var(--text)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[var(--focus-ring)] transition-all"
                placeholder="e.g. Jane Smith"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[1.05rem] font-semibold text-[var(--text)] mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full min-h-[56px] px-5 text-[1.1rem] bg-[var(--surface)] border-2 border-[var(--border)] rounded-xl text-[var(--text)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[var(--focus-ring)] transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[1.05rem] font-semibold text-[var(--text)] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full min-h-[56px] px-5 pr-16 text-[1.1rem] bg-[var(--surface)] border-2 border-[var(--border)] rounded-xl text-[var(--text)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[var(--focus-ring)] transition-all"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] rounded-lg transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-6 h-6" />
                  ) : (
                    <Eye className="w-6 h-6" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[0.95rem] text-[var(--text-tertiary)]">
                Use at least 8 characters.
              </p>
            </div>

            {/* Terms checkbox — large touch target */}
            <div className="flex items-start gap-4">
              <div className="pt-0.5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-7 h-7 rounded-lg border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] cursor-pointer accent-[var(--primary)]"
                />
              </div>
              <label
                htmlFor="terms"
                className="text-[1.05rem] text-[var(--text-secondary)] leading-relaxed cursor-pointer"
              >
                I understand that CryptoCoach AI is for{" "}
                <strong className="text-[var(--text)] font-semibold">
                  educational purposes only
                </strong>{" "}
                and does not provide financial, investment, or tax advice.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[56px] px-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--primary-text)] font-bold rounded-xl transition-colors flex items-center justify-center gap-3 text-[1.15rem]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Creating Account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[1.05rem] text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--primary)] hover:underline font-semibold underline-offset-4"
            >
              Log in here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

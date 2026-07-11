"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to log in");
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
        aria-label="Login navigation"
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
              href="/register"
              className="inline-flex items-center justify-center min-h-[52px] px-5 text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium rounded-xl transition-colors text-[1rem]"
            >
              Need an account?
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
              Welcome Back
            </h1>
            <p className="text-[1.1rem] text-[var(--text-secondary)] leading-relaxed">
              Log in to continue learning about crypto
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
                  autoComplete="current-password"
                  className="w-full min-h-[56px] px-5 pr-16 text-[1.1rem] bg-[var(--surface)] border-2 border-[var(--border)] rounded-xl text-[var(--text)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[var(--focus-ring)] transition-all"
                  placeholder="Enter your password"
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
                  Logging in…
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[1.05rem] text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--primary)] hover:underline font-semibold underline-offset-4"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = getSupabase();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setError(""); setSuccess("");
    if (!agreedToTerms) { setError("Please check the box to agree to the terms of use before continuing."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    const { data, error: err } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    setLoading(false);
    if (err) { setError(err.message); return; }
    if (data.session) { router.push("/chat"); }
    else { setSuccess("Almost done! Check your email for a confirmation link, then log in."); }
  };

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center px-5 sm:px-8 py-10">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3 no-underline" aria-label="MinasCoach — Home">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/20"><span className="text-2xl sm:text-3xl" aria-hidden="true">👑</span></div>
            <span className="text-xl sm:text-3xl font-bold text-white">MinasCoach</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#110e20] border-2 border-purple-800/40 rounded-2xl p-6 sm:p-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-white mb-2 sm:mb-3">Create Your Account</h1>
          <p className="text-sm sm:text-base text-slate-300 text-center mb-6 sm:mb-8 leading-relaxed">It only takes a minute to start learning crypto the safe way.</p>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
            {error && (<div className="bg-red-900/40 border-2 border-red-500 rounded-xl p-4 text-red-200 text-sm sm:text-base font-medium leading-relaxed" role="alert"><span className="font-bold">⚠ Error:&ensp;</span>{error}</div>)}
            {success && (<div className="bg-green-900/40 border-2 border-green-500 rounded-xl p-4 text-green-200 text-sm sm:text-base font-medium leading-relaxed" role="alert">{success}</div>)}

            <div>
              <label htmlFor="name" className="block text-sm sm:text-base font-bold text-slate-200 mb-2">Your Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 sm:h-14 bg-[#0c0a1a] border-2 border-purple-700/40 rounded-xl px-4 sm:px-5 text-base sm:text-lg text-white placeholder-slate-500 transition-colors hover:border-purple-600/60 focus-visible:border-purple-500" placeholder="e.g. Jane Smith" required autoComplete="name" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-bold text-slate-200 mb-2">Email Address</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 sm:h-14 bg-[#0c0a1a] border-2 border-purple-700/40 rounded-xl px-4 sm:px-5 text-base sm:text-lg text-white placeholder-slate-500 transition-colors hover:border-purple-600/60 focus-visible:border-purple-500" placeholder="you@example.com" required autoComplete="email" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm sm:text-base font-bold text-slate-200 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 sm:h-14 bg-[#0c0a1a] border-2 border-purple-700/40 rounded-xl px-4 sm:px-5 pr-14 text-base sm:text-lg text-white placeholder-slate-500 transition-colors hover:border-purple-600/60 focus-visible:border-purple-500" placeholder="At least 8 characters" required minLength={8} autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-slate-400 hover:text-white rounded-lg transition-colors" aria-label={showPassword ? "Hide password" : "Show password"}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{showPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><path d="M1 1l22 22" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}</svg>
                </button>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400">Must be at least 8 characters long.</p>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="large-checkbox mt-0.5 cursor-pointer flex-shrink-0" />
              <label htmlFor="terms" className="text-sm sm:text-base text-slate-300 leading-relaxed cursor-pointer select-none">I understand that MinasCoach provides educational information only and does <strong className="text-white">not</strong> offer financial, investment, or tax advice.</label>
            </div>

            <button type="submit" disabled={loading || !supabase} className="w-full h-12 sm:h-14 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] font-bold text-base sm:text-lg rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2">
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm sm:text-base text-slate-300 mt-6 sm:mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-bold underline underline-offset-4">Log in here</Link>
          </p>
        </div>

        <p className="text-center mt-6 sm:mt-8">
          <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm sm:text-base font-semibold underline underline-offset-4">← Back to home page</Link>
        </p>
      </div>
    </div>
  );
}

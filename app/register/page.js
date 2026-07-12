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
    <div className="min-h-screen animated-gradient flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10"><Link href="/" className="inline-flex items-center gap-3 no-underline" aria-label="MinasCoach — Home"><div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/20"><span className="text-3xl" aria-hidden="true">👑</span></div><span className="text-2xl sm:text-3xl font-bold text-white">MinasCoach</span></Link></div>
        <div className="bg-[#110e20] border-2 border-purple-800/40 rounded-2xl p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-3">Create Your Account</h1>
          <p className="text-base sm:text-lg text-slate-300 text-center mb-8 sm:mb-10 leading-relaxed">It only takes a minute to start learning crypto the safe way.</p>
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7" noValidate>
            {error && (<div className="bg-red-900/40 border-2 border-red-500 rounded-xl p-4 sm:p-5 text-red-200 text-base font-medium" role="alert"><span className="font-bold">⚠ Error:&ensp;</span>{error}</div>)}
            {success && (<div className="bg-green-900/40 border-2 border-green-500 rounded-xl p-4 sm:p-5 text-green-200 text-base font-medium" role="alert">{success}</div>)}
            <div><label htmlFor="name" className="block text-base font-bold text-slate-200 mb-2 sm:mb-3">Your Name</label><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0c0a1a] border-2 border-purple-700/40 rounded-xl px-5 text-lg text-white placeholder-slate-500 transition-colors hover:border-purple-600/60 focus-visible:border-purple-500" style={{ minHeight: "56px" }} placeholder="e.g. Jane Smith" required autoComplete="name" /></div>
            <div><label htmlFor="email" className="block text-base font-bold text-slate-200 mb-2 sm:mb-3">Email Address</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0c0a1a] border-2 border-purple-700/40 rounded-xl px-5 text-lg text-white placeholder-slate-500 transition-colors hover:border-purple-600/60 focus-visible:border-purple-500" style={{ minHeight: "56px" }} placeholder="you@example.com" required autoComplete="email" /></div>
            <div><label htmlFor="password" className="block text-base font-bold text-slate-200 mb-2 sm:mb-3">Password</label><div className="relative"><input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0c0a1a] border-2 border-purple-700/40 rounded-xl px-5 pr-28 text-lg text-white placeholder-slate-500 transition-colors hover:border-purple-600/60 focus-visible:border-purple-500" style={{ minHeight: "56px" }} placeholder="At least 8 characters" required minLength={8} autoComplete="new-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-900/50 hover:bg-purple-800/60 text-slate-200 text-base font-semibold px-4 py-2 rounded-lg border border-purple-700/40 transition-colors" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div><p className="mt-2 text-sm text-slate-400">Must be at least 8 characters long.</p></div>
            <div className="flex items-start gap-4 cursor-pointer"><input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="large-checkbox mt-0.5 cursor-pointer" /><label htmlFor="terms" className="text-base text-slate-300 leading-relaxed cursor-pointer select-none">I understand that MinasCoach provides educational information only and does <strong className="text-white">not</strong> offer financial, investment, or tax advice.</label></div>
            <button type="submit" disabled={loading || !supabase} className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] font-bold text-lg sm:text-xl rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-3" style={{ minHeight: "60px" }}>{loading ? "Creating account…" : "Create Account"}</button>
          </form>
          <div className="mt-8 text-center"><p className="text-base sm:text-lg text-slate-300">Already have an account?{" "}<Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-bold underline">Log in here</Link></p></div>
        </div>
        <div className="text-center mt-8"><Link href="/" className="text-slate-400 hover:text-slate-200 text-base font-semibold underline">← Back to home page</Link></div>
      </div>
    </div>
  );
}

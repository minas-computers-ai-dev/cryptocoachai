import Link from "next/link";

const FEATURES = [
  { emoji: "💬", title: "Plain English Explanations", desc: "Complex crypto concepts explained simply. No confusing jargon — just clear answers you can actually understand." },
  { emoji: "🛡️", title: "Scam Detection", desc: "Not sure if something is a scam? Ask our AI. It recognises the most common crypto scams and will warn you immediately." },
  { emoji: "📚", title: "Comprehensive Education", desc: "From wallets to exchanges, security to taxes — everything beginners need to know is covered." },
  { emoji: "🔒", title: "Security First", desc: "Learn the 10 essential security rules before you buy your first crypto. Stay safe from day one." },
  { emoji: "⚠️", title: "No Financial Advice", desc: "We never tell you what to buy. Our AI educates — it does not advise. That keeps you safe from hype." },
  { emoji: "🕐", title: "Available 24/7", desc: "Learn on your schedule. Your AI coach is always ready whenever you have questions — day or night." },
];

const STEPS = [
  { num: "1", title: "Sign Up for Free", desc: "Create your account in seconds. No credit card required." },
  { num: "2", title: "Ask Any Question", desc: "Type any crypto question in plain English. No question is too basic — that's what we're here for." },
  { num: "3", title: "Get Clear Answers", desc: "Receive easy-to-understand explanations, safety tips, and guidance. Ask follow-up questions anytime." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen animated-gradient">
      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 bg-[#0c0a1a]/90 backdrop-blur-md border-b-2 border-purple-900/60" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[72px] gap-4">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 no-underline flex-shrink-0" aria-label="MinasCoach — Home">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-lg sm:text-xl" aria-hidden="true">👑</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold text-white">MinasCoach</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/login" className="inline-flex items-center justify-center h-11 sm:h-12 px-4 sm:px-5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white rounded-xl hover:bg-purple-900/40 transition-colors no-underline whitespace-nowrap">
                Log In
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] rounded-xl transition-all shadow-lg shadow-yellow-500/20 no-underline whitespace-nowrap">
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-12 sm:pt-20 pb-8 sm:pb-16 px-5 sm:px-8" aria-labelledby="hero-heading">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 bg-purple-950/60 border-2 border-purple-700/50 rounded-full px-4 sm:px-5 py-2.5 mb-8 pulse-badge">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-slate-200 font-medium">AI-Powered&ensp;•&ensp;Beginner Friendly&ensp;•&ensp;Always Available</span>
              </div>
              <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">
                Understand Crypto<br /><span className="gradient-text">At Your Own Pace</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Your personal AI assistant for cryptocurrency education. Ask any question in plain&nbsp;English — no jargon, no hype, no pressure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/register" className="inline-flex items-center justify-center h-14 sm:h-[60px] px-8 sm:px-10 text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] rounded-2xl transition-all shadow-xl shadow-yellow-500/20 no-underline whitespace-nowrap">
                  Start Learning Free&nbsp;→
                </Link>
                <Link href="#features" className="inline-flex items-center justify-center h-14 sm:h-[60px] px-8 sm:px-10 text-base sm:text-lg font-bold text-white bg-purple-900/40 hover:bg-purple-900/60 border-2 border-purple-600/50 rounded-2xl transition-all no-underline whitespace-nowrap">
                  See How It Works
                </Link>
              </div>
            </div>

            {/* Demo chat preview */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative demo-float-in w-full max-w-md">
                <div className="demo-glow" />
                <div className="demo-hover relative bg-[#110e20] border-2 border-purple-700/40 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/40">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-purple-950/80 border-b border-purple-800/40">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center" aria-hidden="true"><span className="text-base">👑</span></div>
                    <div><p className="text-sm font-bold text-white leading-tight">MinasCoach</p><p className="text-xs text-green-400 font-medium">● Online</p></div>
                  </div>
                  <div className="px-4 sm:px-5 py-5 space-y-4 min-h-[260px] sm:min-h-[300px]">
                    <div className="flex justify-end demo-line-1"><div className="bg-yellow-500 text-[#0c0a1a] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]"><p className="text-sm font-semibold">What is a seed phrase?</p></div></div>
                    <div className="flex gap-2.5 items-start demo-line-2"><div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true"><span className="text-xs">👑</span></div><div className="bg-purple-900/40 border border-purple-700/30 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%]"><p className="text-sm text-slate-200 leading-relaxed">A <strong className="text-yellow-400">seed phrase</strong> is a set of 12–24 words that acts like a master key to your crypto wallet. If you lose access to your wallet, these words let you recover everything.</p></div></div>
                    <div className="flex justify-end demo-line-3"><div className="bg-yellow-500 text-[#0c0a1a] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]"><p className="text-sm font-semibold">Should I store it on my phone?</p></div></div>
                    <div className="flex gap-2.5 items-start demo-line-4"><div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true"><span className="text-xs">👑</span></div><div className="bg-purple-900/40 border border-purple-700/30 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%]"><p className="text-sm text-slate-200 leading-relaxed"><strong className="text-red-400">⚠️ No!</strong> Never store your seed phrase on a phone, computer, or in the cloud. Write it on paper and keep it in a safe place.</p></div></div>
                  </div>
                  <div className="px-4 sm:px-5 pb-4">
                    <div className="flex items-center gap-3 bg-[#1a1630] border border-purple-800/30 rounded-xl px-4 py-3">
                      <p className="text-sm text-slate-500 flex-1"><span className="demo-cursor" />Ask me anything about crypto…</p>
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <svg className="w-4 h-4 text-[#0c0a1a]" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Example questions ── */}
      <section className="pb-12 sm:pb-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#110e20] border-2 border-purple-800/40 rounded-2xl p-6 sm:p-8">
            <p className="text-sm sm:text-base text-slate-300 mb-5 font-semibold text-center">You can ask things like:</p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center">
              {["What is Bitcoin?", "How do I buy crypto safely?", "Is this a scam?", "What's a seed phrase?", "Hot vs. cold wallet?"].map((q, i) => (
                <span key={i} className="bg-purple-950/60 text-slate-200 border border-purple-700/40 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm font-medium whitespace-nowrap">&ldquo;{q}&rdquo;</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-16 sm:py-24 px-5 sm:px-8 bg-[#0c0a1a]/80" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-4">Everything You Need to Learn Crypto Safely</h2>
          <p className="text-base sm:text-lg text-slate-300 text-center mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed">Our AI coach is trained on comprehensive education materials and designed specifically for beginners.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-[#110e20] border-2 border-purple-800/40 rounded-2xl p-6 sm:p-7 transition-colors hover:border-purple-600/60 flex flex-col">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-purple-950/60 flex items-center justify-center mb-4 sm:mb-5" aria-hidden="true"><span className="text-2xl sm:text-3xl">{f.emoji}</span></div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed flex-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-8" aria-labelledby="how-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="how-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-10 sm:mb-14">How It Works</h2>
          <div className="space-y-8 sm:space-y-10">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4 sm:gap-6 items-start">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl font-extrabold text-white shadow-lg shadow-purple-500/20" aria-hidden="true">{s.num}</div>
                <div className="pt-0.5 sm:pt-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">{s.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-8" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-950/80 to-[#110e20] border-2 border-purple-700/40 rounded-3xl p-8 sm:p-14">
            <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-5">Ready to Start Learning?</h2>
            <p className="text-base sm:text-lg text-slate-300 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">Join others who are learning crypto the safe&nbsp;way. Free to start, no credit card required.</p>
            <Link href="/register" className="inline-flex items-center justify-center h-14 sm:h-[60px] px-8 sm:px-12 text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] rounded-2xl transition-all shadow-xl shadow-yellow-500/20 no-underline whitespace-nowrap">
              Create Free Account&nbsp;→
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 sm:py-14 px-5 sm:px-8 border-t-2 border-purple-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center"><span className="text-base sm:text-lg" aria-hidden="true">👑</span></div>
              <span className="font-bold text-white text-base sm:text-lg">MinasCoach</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm text-center sm:text-right max-w-lg leading-relaxed">This tool is for educational purposes only. It does not provide financial, investment, or tax advice. Cryptocurrency is volatile and risky. Never invest more than you can afford to&nbsp;lose.</p>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-slate-500 text-xs sm:text-sm">© {new Date().getFullYear()} MinasCoach. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

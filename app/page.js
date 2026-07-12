import Link from "next/link";

const FEATURES = [
  {
    emoji: "💬",
    title: "Plain English Explanations",
    desc: "Complex crypto concepts explained simply. No confusing jargon — just clear answers you can actually understand.",
  },
  {
    emoji: "🛡️",
    title: "Scam Detection",
    desc: "Not sure if something is a scam? Ask our AI. It recognises the most common crypto scams and will warn you immediately.",
  },
  {
    emoji: "📚",
    title: "Comprehensive Education",
    desc: "From wallets to exchanges, security to taxes — everything beginners need to know is covered.",
  },
  {
    emoji: "🔒",
    title: "Security First",
    desc: "Learn the 10 essential security rules before you buy your first crypto. Stay safe from day one.",
  },
  {
    emoji: "⚠️",
    title: "No Financial Advice",
    desc: "We never tell you what to buy. Our AI educates — it does not advise. That keeps you safe from hype.",
  },
  {
    emoji: "🕐",
    title: "Available 24 / 7",
    desc: "Learn on your schedule. Your AI coach is always ready whenever you have questions — day or night.",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Sign Up for Free",
    desc: "Create your account in seconds. No credit card required.",
  },
  {
    num: "2",
    title: "Ask Any Question",
    desc: "Type any crypto question in plain English. No question is too basic — that's what we're here for.",
  },
  {
    num: "3",
    title: "Get Clear Answers",
    desc: "Receive easy-to-understand explanations, safety tips, and guidance. Ask follow-up questions anytime.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen animated-gradient">
      {/* ── Navigation ── */}
      <nav
        className="sticky top-0 z-50 bg-[#0c0a1a]/90 backdrop-blur-md border-b-2 border-purple-900/60"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 no-underline flex-shrink-0"
              aria-label="MinasCoach — Home"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-xl sm:text-2xl" aria-hidden="true">👑</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold text-white">
                MinasCoach
              </span>
            </Link>

            {/* Nav actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/login"
                className="text-slate-200 hover:text-white font-semibold text-base sm:text-lg px-3 sm:px-5 py-3 rounded-xl hover:bg-purple-900/40 transition-colors no-underline"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] font-bold text-base sm:text-lg px-4 sm:px-7 py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/20 no-underline whitespace-nowrap"
                style={{ minHeight: "52px", display: "inline-flex", alignItems: "center" }}
              >
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
            {/* Left: copy */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-purple-950/60 border-2 border-purple-700/50 rounded-full px-5 py-3 mb-8 pulse-badge">
                <span className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm sm:text-base text-slate-200 font-medium">
                  AI-Powered&ensp;•&ensp;Beginner Friendly&ensp;•&ensp;Always Available
                </span>
              </div>

              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white"
              >
                Understand Crypto
                <br />
                <span className="gradient-text">At Your Own Pace</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Your personal AI assistant for cryptocurrency education. Ask any
                question in plain&nbsp;English — no jargon, no hype, no pressure.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] font-bold text-lg sm:text-xl px-8 sm:px-10 rounded-2xl transition-all shadow-xl shadow-yellow-500/20 no-underline text-center"
                  style={{ minHeight: "60px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  Start Learning Free →
                </Link>
                <Link
                  href="#features"
                  className="bg-purple-900/40 hover:bg-purple-900/60 text-white font-bold text-lg sm:text-xl px-8 sm:px-10 rounded-2xl transition-all border-2 border-purple-600/50 no-underline text-center"
                  style={{ minHeight: "60px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  See How It Works
                </Link>
              </div>
            </div>

            {/* Right: animated chat demo "screenshot" */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative demo-float-in w-full max-w-md">
                {/* Glow behind */}
                <div className="demo-glow" />

                {/* Mock chat window */}
                <div className="demo-hover relative bg-[#110e20] border-2 border-purple-700/40 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/40">
                  {/* Title bar */}
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-purple-950/80 border-b border-purple-800/40">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center" aria-hidden="true">
                      <span className="text-base">👑</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">MinasCoach</p>
                      <p className="text-xs text-green-400 font-medium">● Online</p>
                    </div>
                  </div>

                  {/* Chat lines — staggered animation */}
                  <div className="px-4 sm:px-5 py-5 space-y-4 min-h-[260px] sm:min-h-[300px]">
                    {/* User question */}
                    <div className="flex justify-end demo-line-1">
                      <div className="bg-yellow-500 text-[#0c0a1a] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm font-semibold">What is a seed phrase?</p>
                      </div>
                    </div>

                    {/* Coach reply */}
                    <div className="flex gap-2.5 items-start demo-line-2">
                      <div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                        <span className="text-xs">👑</span>
                      </div>
                      <div className="bg-purple-900/40 border border-purple-700/30 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%]">
                        <p className="text-sm text-slate-200 leading-relaxed">
                          A <strong className="text-yellow-400">seed phrase</strong> is a set of 12–24 words that acts like a master key to your crypto wallet. If you lose access to your wallet, these words let you recover everything.
                        </p>
                      </div>
                    </div>

                    {/* Follow-up user */}
                    <div className="flex justify-end demo-line-3">
                      <div className="bg-yellow-500 text-[#0c0a1a] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm font-semibold">Should I store it on my phone?</p>
                      </div>
                    </div>

                    {/* Coach safety warning */}
                    <div className="flex gap-2.5 items-start demo-line-4">
                      <div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                        <span className="text-xs">👑</span>
                      </div>
                      <div className="bg-purple-900/40 border border-purple-700/30 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%]">
                        <p className="text-sm text-slate-200 leading-relaxed">
                          <strong className="text-red-400">⚠️ No!</strong> Never store your seed phrase on a phone, computer, or in the cloud. Write it on paper and keep it in a safe place.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Input bar mock */}
                  <div className="px-4 sm:px-5 pb-4">
                    <div className="flex items-center gap-3 bg-[#1a1630] border border-purple-800/30 rounded-xl px-4 py-3">
                      <p className="text-sm text-slate-500 flex-1">Ask me anything about crypto…<span className="demo-cursor" /></p>
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <svg className="w-4 h-4 text-[#0c0a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Example questions (below hero, full width) ── */}
      <section className="pb-12 sm:pb-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#110e20] border-2 border-purple-800/40 rounded-2xl p-6 sm:p-8">
            <p className="text-base text-slate-300 mb-5 font-semibold text-center">
              You can ask things like:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "What is Bitcoin?",
                "How do I buy crypto safely?",
                "Is this a scam?",
                "What's a seed phrase?",
                "Hot vs. cold wallet?",
              ].map((q, i) => (
                <span
                  key={i}
                  className="bg-purple-950/60 text-slate-200 border border-purple-700/40 px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium"
                >
                  &ldquo;{q}&rdquo;
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="py-16 sm:py-24 px-5 sm:px-8 bg-[#0c0a1a]/80"
        aria-labelledby="features-heading"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-4"
          >
            Everything You Need to Learn Crypto Safely
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 text-center mb-14 max-w-2xl mx-auto">
            Our AI coach is trained on comprehensive education materials and
            designed specifically for beginners.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-[#110e20] border-2 border-purple-800/40 rounded-2xl p-6 sm:p-7 transition-colors hover:border-purple-600/60"
              >
                <div
                  className="w-14 h-14 rounded-xl bg-purple-950/60 flex items-center justify-center mb-5"
                  aria-hidden="true"
                >
                  <span className="text-3xl">{f.emoji}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {f.title}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        className="py-16 sm:py-24 px-5 sm:px-8"
        aria-labelledby="how-heading"
      >
        <div className="max-w-3xl mx-auto">
          <h2
            id="how-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-14"
          >
            How It Works
          </h2>

          <div className="space-y-8 sm:space-y-10">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-5 sm:gap-7 items-start">
                <div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 text-2xl font-extrabold text-white shadow-lg shadow-purple-500/20"
                  aria-hidden="true"
                >
                  {s.num}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
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
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-5"
            >
              Ready to Start Learning?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
              Join others who are learning crypto the safe&nbsp;way. Free to
              start, no credit card required.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0c0a1a] font-bold text-lg sm:text-xl px-10 sm:px-12 rounded-2xl transition-all shadow-xl shadow-yellow-500/20 no-underline"
              style={{ minHeight: "60px" }}
            >
              Create Free Account →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 sm:py-14 px-5 sm:px-8 border-t-2 border-purple-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <span className="text-lg" aria-hidden="true">👑</span>
              </div>
              <span className="font-bold text-white text-lg">
                MinasCoach
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base text-center md:text-right max-w-xl leading-relaxed">
              This tool is for educational purposes only. It does not provide
              financial, investment, or tax advice. Cryptocurrency is volatile
              and risky. Never invest more than you can afford to&nbsp;lose.
            </p>
          </div>
          <div className="mt-8 text-center text-slate-500 text-sm sm:text-base">
            © {new Date().getFullYear()} MinasCoach. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

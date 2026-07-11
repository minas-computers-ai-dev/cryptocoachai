import Link from "next/link";
import {
  Shield,
  BookOpen,
  MessageCircle,
  AlertTriangle,
  Zap,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* ── Navigation ── */}
      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-50 border-b-2 border-[var(--border)] bg-[var(--bg)]"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFB020] to-[#FF8C00] flex items-center justify-center">
                <span className="text-[var(--primary-text)] font-extrabold text-base">
                  CC
                </span>
              </div>
              <span className="text-[1.35rem] font-bold text-[var(--text)]">
                CryptoCoach&nbsp;AI
              </span>
            </div>

            {/* Nav links — large touch targets */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center min-h-[52px] px-6 text-[var(--text)] hover:text-[var(--primary)] font-medium rounded-xl transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center min-h-[52px] px-6 sm:px-8 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-bold rounded-xl transition-colors text-[1.05rem]"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section id="main-content" className="pt-14 sm:pt-20 pb-16 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--surface)] border-2 border-[var(--border)] mb-10">
            <span className="w-3 h-3 rounded-full bg-[var(--success)] animate-pulse" />
            <span className="text-[1rem] text-[var(--text-secondary)]">
              Trusted by 1,000+ crypto beginners
            </span>
          </div>

          <h1 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-extrabold text-[var(--text)] mb-6 leading-[1.2]">
            Understand Crypto
            <br />
            <span className="text-[var(--primary)]">At Your Own Pace</span>
          </h1>

          <p className="text-[1.2rem] sm:text-[1.35rem] text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
            Your private AI assistant that explains cryptocurrency in plain
            English. No jargon, no hype, no pressure&nbsp;—&nbsp;just clear
            answers to your questions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[56px] px-10 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-bold rounded-xl transition-colors text-[1.15rem]"
            >
              Start Learning Free&nbsp;→
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[56px] px-10 bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--text)] font-semibold rounded-xl border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors text-[1.15rem]"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── Demo Preview ── */}
      <section className="py-10 px-5 sm:px-8" aria-label="Chat example">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[var(--surface)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 px-5 py-4 bg-[var(--surface-raised)] border-b-2 border-[var(--border)]">
              <div className="w-4 h-4 rounded-full bg-[var(--danger)]" />
              <div className="w-4 h-4 rounded-full bg-[var(--warning)]" />
              <div className="w-4 h-4 rounded-full bg-[var(--success)]" />
              <span className="ml-3 text-[1rem] text-[var(--text-secondary)] font-medium">
                CryptoCoach AI
              </span>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              {/* User bubble */}
              <div className="flex justify-end">
                <div className="max-w-[85%] px-5 py-4 bg-[var(--primary)] rounded-2xl rounded-br-md">
                  <p className="text-[var(--primary-text)] text-[1.05rem] font-medium leading-relaxed">
                    What is a crypto wallet?
                  </p>
                </div>
              </div>
              {/* AI bubble */}
              <div className="flex justify-start">
                <div className="max-w-[85%] px-5 py-4 bg-[var(--surface-raised)] rounded-2xl rounded-bl-md border border-[var(--border)]">
                  <p className="text-[var(--text)] text-[1.05rem] leading-relaxed">
                    <strong className="text-[var(--primary)] font-bold">
                      Great question!
                    </strong>{" "}
                    A crypto wallet doesn&rsquo;t actually store your
                    crypto&nbsp;— it stores the{" "}
                    <strong className="text-[var(--primary)] font-bold">
                      keys
                    </strong>{" "}
                    that prove you own it.
                  </p>
                  <p className="text-[var(--text)] text-[1.05rem] leading-relaxed mt-3">
                    Think of it like your email: the emails exist on servers,
                    but your password lets you access them. Your wallet holds
                    the &ldquo;password&rdquo; (private key) to your crypto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-5 sm:px-8" aria-label="Features">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-extrabold text-[var(--text)] text-center mb-4 leading-tight">
            Everything You Need to
            <br className="hidden sm:block" /> Learn Crypto Safely
          </h2>
          <p className="text-[1.1rem] text-[var(--text-secondary)] text-center mb-14 max-w-2xl mx-auto leading-relaxed">
            Designed specifically for beginners, with a focus on education and
            security.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BookOpen className="w-7 h-7" />}
              title="Plain English Explanations"
              description="No confusing jargon. Every concept is explained simply, with real-world analogies you can relate to."
            />
            <FeatureCard
              icon={<Shield className="w-7 h-7" />}
              title="Security First"
              description="Learn the essential security practices to protect yourself from hackers and keep your crypto safe."
            />
            <FeatureCard
              icon={<AlertTriangle className="w-7 h-7" />}
              title="Scam Detection"
              description="Describe any suspicious situation and get immediate feedback on whether it's a scam."
            />
            <FeatureCard
              icon={<MessageCircle className="w-7 h-7" />}
              title="Ask Anything"
              description="No question is too basic. Ask about wallets, exchanges, buying, selling — whatever you need."
            />
            <FeatureCard
              icon={<Zap className="w-7 h-7" />}
              title="Instant Answers"
              description="Get clear, accurate responses in seconds. Learn at your own pace, on your own schedule."
            />
            <FeatureCard
              icon={<Users className="w-7 h-7" />}
              title="Education, Not Hype"
              description="We never give investment advice or promote specific coins. Just honest, educational content."
            />
          </div>
        </div>
      </section>

      {/* ── Sample Questions ── */}
      <section
        className="py-20 px-5 sm:px-8 bg-[var(--surface)]"
        aria-label="Example questions"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-extrabold text-[var(--text)] text-center mb-4">
            Try Asking Questions Like These
          </h2>
          <p className="text-[1.1rem] text-[var(--text-secondary)] text-center mb-12 leading-relaxed">
            CryptoCoach AI is ready to answer all your crypto questions
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <QuestionCard question="What is cryptocurrency?" />
            <QuestionCard question="How do I buy Bitcoin?" />
            <QuestionCard question="What's the difference between a hot and cold wallet?" />
            <QuestionCard question="Someone on Instagram told me about a guaranteed crypto investment. Should I do it?" />
            <QuestionCard question="What's a seed phrase and why is it important?" />
            <QuestionCard question="Is Coinbase safe to use?" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-5 sm:px-8" aria-label="Call to action">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-extrabold text-[var(--text)] mb-6 leading-tight">
            Ready to Learn Crypto
            <br className="hidden sm:block" /> the Safe Way?
          </h2>
          <p className="text-[1.2rem] text-[var(--text-secondary)] mb-10 leading-relaxed">
            Join thousands of beginners who are learning cryptocurrency with
            confidence.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center min-h-[56px] px-10 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-bold rounded-xl transition-colors text-[1.15rem]"
          >
            Create Free Account&nbsp;→
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-[var(--border)] py-14 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFB020] to-[#FF8C00] flex items-center justify-center">
                <span className="text-[var(--primary-text)] font-extrabold text-base">
                  CC
                </span>
              </div>
              <span className="text-[1.2rem] font-bold text-[var(--text)]">
                CryptoCoach AI
              </span>
            </div>
            <p className="text-[1rem] text-[var(--text-secondary)] text-center md:text-left max-w-xl leading-relaxed">
              <strong className="text-[var(--text)] font-semibold">Disclaimer:</strong>{" "}
              This tool is for educational purposes only. It does not provide
              financial, investment, or tax advice. Always do your own research
              and consult qualified professionals.
            </p>
          </div>

          {/* Mobile log-in link */}
          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center min-h-[52px] px-8 text-[var(--primary)] font-bold text-[1.05rem] border-2 border-[var(--primary)] rounded-xl hover:bg-[var(--primary)] hover:text-[var(--primary-text)] transition-colors"
            >
              Log In to Your Account
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t-2 border-[var(--border)] text-center">
            <p className="text-[1rem] text-[var(--text-tertiary)]">
              © {new Date().getFullYear()} CryptoCoach AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components ── */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-7 bg-[var(--surface)] rounded-2xl border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors">
      <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center text-[var(--primary)] mb-5">
        {icon}
      </div>
      <h3 className="text-[1.15rem] font-bold text-[var(--text)] mb-3">
        {title}
      </h3>
      <p className="text-[1.05rem] text-[var(--text-secondary)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function QuestionCard({ question }: { question: string }) {
  return (
    <Link
      href="/register"
      className="flex items-center gap-4 min-h-[56px] p-5 bg-[var(--surface-raised)] rounded-xl border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors group"
    >
      <MessageCircle className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
      <p className="text-[1.05rem] text-[var(--text)] group-hover:text-[var(--primary)] transition-colors leading-snug">
        &ldquo;{question}&rdquo;
      </p>
    </Link>
  );
}

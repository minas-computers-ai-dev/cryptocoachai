import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link href="/" className="brand">
            <span className="brand-mark" aria-hidden="true">₿</span>
            CryptoCoach
          </Link>
          <nav className="header-nav">
            <Link href="/login" className="btn btn-secondary">
              Log in
            </Link>
            <Link href="/register" className="btn btn-primary">
              Sign up free
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <p className="hero-eyebrow">For crypto beginners</p>
            <h1>
              Understand crypto <span className="underlined">at your own pace.</span>
            </h1>
            <p>
              CryptoCoach is a private AI guide that answers your questions about
              cryptocurrency in plain English. No jargon, no hype, no pressure —
              just clear, patient explanations whenever you need them.
            </p>
            <div className="hero-actions">
              <Link href="/register" className="btn btn-primary">
                Create your free account
              </Link>
              <Link href="/login" className="btn btn-secondary">
                I already have an account
              </Link>
            </div>
          </div>
        </section>

        <section className="safety-band">
          <div className="container">
            <span className="shield" aria-hidden="true">🛡️</span>
            <div>
              <h2>Worried something might be a scam?</h2>
              <p>
                Describe the situation to CryptoCoach and it will help you spot
                the warning signs — before any money leaves your hands. Scam
                awareness is built into every conversation.
              </p>
            </div>
          </div>
        </section>

        <section className="topics">
          <div className="container">
            <h2>What you can ask about</h2>
            <div className="topic-grid">
              <div className="topic-card">
                <h3>Crypto basics</h3>
                <p>What cryptocurrency is, how it works, and why people use it — explained from zero.</p>
              </div>
              <div className="topic-card">
                <h3>Staying safe</h3>
                <p>How to protect your accounts, spot scams, and keep your savings secure.</p>
              </div>
              <div className="topic-card">
                <h3>Wallets &amp; storage</h3>
                <p>Where crypto actually lives, what a seed phrase is, and how to store things safely.</p>
              </div>
              <div className="topic-card">
                <h3>Exchanges &amp; buying</h3>
                <p>How buying and selling works, what fees to expect, and how to evaluate an exchange.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p className="disclaimer">
            CryptoCoach is an educational tool. It does not provide financial,
            investment, legal, or tax advice, and it never recommends buying or
            selling any cryptocurrency. For financial decisions, please consult
            a licensed professional.
          </p>
        </div>
      </footer>
    </>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "CryptoCoach AI — Learn Crypto in Plain English",
  description:
    "Your private AI assistant that helps you understand cryptocurrency. No jargon, no hype, no pressure — just clear answers to your questions.",
  keywords: [
    "crypto",
    "cryptocurrency",
    "bitcoin",
    "education",
    "learn crypto",
    "crypto for beginners",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Accessibility: skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[var(--primary)] focus:text-[var(--primary-text)] focus:rounded-xl focus:text-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

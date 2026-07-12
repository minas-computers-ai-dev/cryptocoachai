import "./globals.css";
export const metadata = { title: "MinasCoach — Understand Crypto at Your Own Pace", description: "A friendly AI assistant that helps you understand cryptocurrency in plain English. No jargon, no hype, no pressure — just clear, safe education." };
export default function RootLayout({ children }) {
  return (<html lang="en"><body className="bg-[#0c0a1a] text-slate-200 antialiased min-h-screen"><a href="#main-content" className="skip-link">Skip to main content</a><div id="main-content">{children}</div></body></html>);
}

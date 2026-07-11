import "./globals.css";

export const metadata = {
  title: "CryptoCoach — Understand crypto at your own pace",
  description:
    "A private AI guide that explains cryptocurrency in plain English. Built for beginners. No jargon, no hype, no pressure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

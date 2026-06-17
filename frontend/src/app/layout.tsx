import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Autonomous Technical Screening | Prepl",
  description: "Replace manual technical screens with autonomous AI agents. Prepl runs candidates through high-fidelity, sandboxed work samples before you ever see a resume.",
  keywords: "AI technical screening, autonomous recruitment platform, work-sample testing, HR agent for startups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

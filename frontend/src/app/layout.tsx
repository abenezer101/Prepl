import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prepl — AI Interview Coach | Practice, Improve, Get Hired",
  description: "Prepl is an AI-native interview coaching platform. Calibrate mock interviews to any job description, practice speaking with an AI interviewer, and receive real-time behavioral and technical feedback.",
  keywords: "AI interview prep, mock interviews, career coaching, speech analysis, behavioral feedback, job interview practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Science+Gothic:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

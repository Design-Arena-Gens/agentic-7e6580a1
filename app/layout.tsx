import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Tool Agent",
  description: "Minimal agentic tool app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

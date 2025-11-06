"use client";

import { useMemo } from "react";
import Chat from "@/components/Chat";

export default function Page() {
  const samples = useMemo(
    () => [
      "calculate: (2+3)*4",
      "what time is it?",
      "convert 10 km to mi",
      "fetch https://example.com and summarize",
      "Hello agent, introduce yourself"
    ],
    []
  );

  return (
    <main className="container">
      <header className="header">
        <h1>AI Tool Agent</h1>
        <p className="subtitle">
          Local tools: calculator, date/time, unit convert, URL fetch.
        </p>
      </header>
      <Chat samples={samples} />
      <footer className="footer">Built with Next.js ? No external AI APIs</footer>
    </main>
  );
}

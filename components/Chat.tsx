"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export default function Chat({ samples }: { samples: string[] }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content) return;
    setLoading(true);
    const nextMessages = [...messages, { role: "user", content } as ChatMessage];
    setMessages(nextMessages);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  return (
    <section className="card chat">
      <div className="messages">
        {messages.length === 0 && (
          <div>
            <div className="meta">Try one of the examples:</div>
            <div className="sampleRow">
              {samples.map((s, i) => (
                <button key={i} className="sampleBtn" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role === "user" ? "bubbleUser" : "bubbleAssistant"}`}>
            {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="inputBar"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSend) void send(input);
        }}
      >
        <input
          className="textInput"
          placeholder={loading ? "Thinking..." : "Message the agent..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className="sendBtn" disabled={!canSend}>
          Send
        </button>
      </form>
    </section>
  );
}

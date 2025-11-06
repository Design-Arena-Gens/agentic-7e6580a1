"use client";

import React from "react";

export default function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  return (
    <div className={`bubble ${role === "user" ? "bubbleUser" : "bubbleAssistant"}`}>
      {content}
    </div>
  );
}

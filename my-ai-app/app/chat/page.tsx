"use client";
import { useEffect, useRef, useState } from "react";
import ChatMessage, { Msg } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ThemeToggle from "@/components/ThemeToggle";

const STORAGE_KEY = "chat-history";

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, loaded]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if ((!input.trim() && !image) || loading) return;

    const userMsg: Msg = {
      role: "user",
      content: input,
      ...(image ? { image } : {}),
    };
    const history: Msg[] = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setImage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error("bad response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: text }]);
      }
    } catch {
      setMessages([
        ...history,
        { role: "assistant", content: "خطا در اتصال به AI" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <main className="mx-auto flex h-screen max-w-2xl flex-col p-4">
      <header className="mb-3 flex items-center justify-between">
        <h1 className="text-lg font-bold">چت با هوش مصنوعی</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clearChat}
            className="rounded-xl border px-3 py-2 text-sm dark:border-gray-700"
          >
            🗑️ پاک کردن
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 flex-col space-y-3 overflow-y-auto">
        {messages.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={send}
        image={image}
        onImageChange={setImage}
        disabled={loading}
      />
    </main>
  );
}
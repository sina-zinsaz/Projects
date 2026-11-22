import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";

type ClientMsg = {
  role: "user" | "assistant";
  content: string;
  image?: string;
};

function toGeminiContents(messages: ClientMsg[]) {
  return messages
    .filter((m) => m.content || m.image)
    .map((m) => {
      const parts: Array<
        { text: string } | { inlineData: { mimeType: string; data: string } }
      > = [];

      if (m.role === "user" && m.image) {
        const match = m.image.match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
        if (match) {
          parts.push({ inlineData: { mimeType: match[1], data: match[2] } });
        }
      }

      parts.push({
        text: m.content || (m.image ? "این عکس رو توضیح بده." : ""),
      });

      return {
        role: m.role === "assistant" ? "model" : "user",
        parts,
      };
    });
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await ai.models.generateContentStream({
          model: MODEL,
          contents: toGeminiContents(messages),
        });

        for await (const chunk of response) {
          if (chunk.text) {
            controller.enqueue(encoder.encode(chunk.text));
          }
        }
      } catch (e) {
        console.error("AI error:", e);
        const msg = e instanceof Error ? e.message : "unknown";
        controller.enqueue(encoder.encode("\n[خطا: " + msg + "]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMsg {
  role: "system" | "user" | "assistant";
  content: string;
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY not found in environment variables.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

export async function embedText(input: string): Promise<number[]> {
  if (!GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found. Returning mock embedding.");
    const hash = input.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return new Array(768).fill(0).map((_, i) => Math.sin(hash + i));
  }

  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(input);
    return result.embedding.values;
  } catch (e) {
    console.error("Embedding error:", e);
    return new Array(768).fill(0);
  }
}

export async function chatComplete(
  messages: ChatMsg[],
  opts: { model?: string; temperature?: number } = {},
): Promise<string> {
  if (!GEMINI_API_KEY) {
    return "Assalam-o-Alaikum! Our AI assistant is currently in demo mode as no API key is configured. [[BOOK_INTENT]]";
  }

  try {
    const modelName = opts.model || "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: opts.temperature ?? 0.7,
      },
    });

    const systemMsg = messages.find((m) => m.role === "system");
    const otherMsgs = messages.filter((m) => m.role !== "system");

    const chat = model.startChat({
      history: otherMsgs.slice(0, -1).map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      systemInstruction: systemMsg?.content,
    });

    const lastMsg = otherMsgs[otherMsgs.length - 1];
    const result = await chat.sendMessage(lastMsg.content);
    return result.response.text();
  } catch (e) {
    console.error("Chat error:", e);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again or message us on WhatsApp.";
  }
}

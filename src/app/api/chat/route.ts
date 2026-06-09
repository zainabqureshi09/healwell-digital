import { GoogleGenerativeAI } from "@google/generative-ai";
import { getQdrantClient, COLLECTION_NAME } from "@/lib/qdrant.server";
import { embedText } from "@/lib/ai.server";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return new Response("GEMINI_API_KEY not configured", { status: 500 });
  }

  const { message, history } = await req.json();

  // 1. Retrieve Context
  let context = "";
  try {
    const embedding = await embedText(message);
    const qdrant = getQdrantClient();
    const results = await qdrant.search(COLLECTION_NAME, {
      vector: embedding,
      limit: 5,
      with_payload: true,
    });
    context = results.map(r => (r.payload as any).content).join("\n\n");
  } catch (e) {
    console.error("Retrieval failed", e);
  }

  const systemPrompt = `You are a medical assistant. Answer ONLY from this CONTEXT:\n${context || "No context found."}\n\nIf not in context, say you don't know and offer WhatsApp +92 342 7160092.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const chat = model.startChat({
    history: history.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
    systemInstruction: systemPrompt,
  });

  const result = await chat.sendMessageStream(message);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream);
}

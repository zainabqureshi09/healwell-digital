// Generic AI helper. Replace with your own OpenAI/Gemini/Anthropic implementation.
export interface ChatMsg {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function embedText(_input: string): Promise<number[]> {
  // Return an empty embedding or throw if not configured
  console.warn(
    "AI Embeddings not configured. Please add an API key and implementation in src/lib/ai.server.ts",
  );
  return new Array(1536).fill(0);
}

export async function chatComplete(
  _messages: ChatMsg[],
  _opts: { model?: string; temperature?: number } = {},
): Promise<string> {
  console.warn(
    "AI Chat not configured. Please add an API key and implementation in src/lib/ai.server.ts",
  );
  return "Assalam-o-Alaikum! Our AI assistant is currently undergoing maintenance. Please contact Muhammad Tanveer directly on WhatsApp +92 342 7160092 for any inquiries or to book an appointment. [[BOOK_INTENT]]";
}

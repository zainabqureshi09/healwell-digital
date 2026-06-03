// Generic AI helper.
// This implementation uses OpenAI by default if OPENAI_API_KEY is present.
// Otherwise, it falls back to mock responses for development.

export interface ChatMsg {
  role: "system" | "user" | "assistant";
  content: string;
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function embedText(input: string): Promise<number[]> {
  if (!OPENAI_API_KEY) {
    console.warn(
      "OPENAI_API_KEY not found. Returning mock embedding. Please add OPENAI_API_KEY to your .env file.",
    );
    // Return a pseudo-random embedding based on the input for stable mock RAG
    const hash = input.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return new Array(1536).fill(0).map((_, i) => Math.sin(hash + i));
  }

  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "OpenAI Embedding failed");
    }

    const data = await res.json();
    return data.data[0].embedding;
  } catch (e) {
    console.error("Embedding error:", e);
    return new Array(1536).fill(0);
  }
}

export async function chatComplete(
  messages: ChatMsg[],
  opts: { model?: string; temperature?: number } = {},
): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.warn(
      "OPENAI_API_KEY not found. Returning mock response. Please add OPENAI_API_KEY to your .env file.",
    );
    return "Assalam-o-Alaikum! Our AI assistant is currently in demo mode as no API key is configured. Please contact Muhammad Tanveer directly on WhatsApp +92 342 7160092 for any inquiries or to book an appointment. [[BOOK_INTENT]]";
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: opts.model || "gpt-4o-mini",
        messages,
        temperature: opts.temperature ?? 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "OpenAI Chat failed");
    }

    const data = await res.json();
    return data.choices[0].message.content || "";
  } catch (e) {
    console.error("Chat error:", e);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again or message us on WhatsApp.";
  }
}

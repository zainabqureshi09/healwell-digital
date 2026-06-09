"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { chatComplete, embedText, type ChatMsg } from "./ai.server";
import { getQdrantClient, COLLECTION_NAME } from "./qdrant.server";

const CLINIC_FACTS = `
Clinic: Muhammad Tanveer Healthcare
Location: DHA Phase 5, Karachi, Pakistan
Phone / WhatsApp: +92 342 7160092
Professional: Muhammad Tanveer is an Assistant Healthcare Administrator (Jamila Sultan Welfare Society), CEO/Founder of Ezaan Health and Education Foundation, AKUH Alumni, and HOD Physiotherapy Department (Dr Essa Physiotherapy Center). He has 5+ years of experience.
Services: Home Physiotherapy, MSK & Pain Management, Dry Needling, Sports Injury Rehabilitation, Back Pain Treatment, Neck Pain Treatment, Stroke Rehabilitation, Elderly Care Physiotherapy, Post-Surgery Rehabilitation. Male and Female physiotherapists available.
`.trim();

const SYSTEM_PROMPT = `You are the official patient-support assistant for Muhammad Tanveer Healthcare.

Muhammad Tanveer is an Assistant Healthcare Administrator and HOD Physiotherapy with 5+ years of experience and an AKUH Alumni.

GROUNDING: Answer ONLY from the provided CONTEXT. If the information is not in the context, say "I couldn't find that information in the available knowledge base." and offer to connect them with the clinic on WhatsApp +92 342 7160092.

STYLE: Professional, concise, warm. Use bullet lists. No hallucinations. 

CITE SOURCES: Always cite your sources by referencing the document title in square brackets like [Source: Title].

LEAD CAPTURE: If they want to book or ask about prices/home visits, include [[BOOK_INTENT]] at the end.`;

const ragChatSchema = z.object({
  message: z.string().trim().min(1).max(2000),
  sessionId: z.string().min(8).max(64),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      }),
    )
    .max(20)
    .default([]),
});

export async function ragChat(input: z.infer<typeof ragChatSchema>) {
  const data = ragChatSchema.parse(input);

  // 1. Ensure conversation exists
  let { data: convo } = await supabaseAdmin
    .from("conversations")
    .select("id")
    .eq("session_id", data.sessionId)
    .maybeSingle();
  if (!convo) {
    const ins = await supabaseAdmin
      .from("conversations")
      .insert({ session_id: data.sessionId })
      .select("id")
      .single();
    if (ins.error) throw new Error(ins.error.message);
    convo = ins.data;
  }
  const conversationId = convo!.id;

  // 2. Retrieve from Qdrant
  let context = "";
  let citations: string[] = [];
  let maxScore = 0;

  try {
    const embedding = await embedText(data.message);
    const qdrant = getQdrantClient();
    const results = await qdrant.search(COLLECTION_NAME, {
      vector: embedding,
      limit: 5,
      with_payload: true,
    });

    if (results.length > 0) {
      maxScore = results[0].score;
      context = results
        .map((r, i) => {
          const payload = r.payload as any;
          const source = payload.title || "Unknown Source";
          if (!citations.includes(source)) citations.push(source);
          return `[Chunk ${i + 1} from ${source}]\n${payload.content}`;
        })
        .join("\n\n");
    }
  } catch (e) {
    console.error("Qdrant retrieval failed", e);
  }

  // 3. Generation
  const messages: ChatMsg[] = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "system",
      content: `CONTEXT:\n${context || "No context found."}\n\nCLINIC FACTS:\n${CLINIC_FACTS}`,
    },
    ...data.history.map((m) => ({ role: m.role, content: m.content }) as ChatMsg),
    { role: "user", content: data.message },
  ];

  const raw = await chatComplete(messages);
  const bookIntent = raw.includes("[[BOOK_INTENT]]");
  const reply = raw.replace(/\[\[BOOK_INTENT\]\]/g, "").trim();

  // 4. Persist
  await supabaseAdmin.from("messages").insert([
    { conversation_id: conversationId, role: "user", content: data.message },
    { conversation_id: conversationId, role: "assistant", content: reply },
  ]);

  return { 
    reply, 
    bookIntent, 
    conversationId, 
    citations, 
    confidence: Math.round(maxScore * 100) 
  };
}

const captureLeadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[+0-9\s-]+$/, "Invalid phone"),
  location: z.string().trim().max(200).optional().default(""),
  problem: z.string().trim().max(1000).optional().default(""),
  preferredTime: z.string().trim().max(100).optional().default(""),
  conversationId: z.string().uuid().optional(),
});

export async function captureLead(input: z.infer<typeof captureLeadSchema>) {
  const data = captureLeadSchema.parse(input);

  const { error, data: lead } = await supabaseAdmin
    .from("leads")
    .insert({
      name: data.name,
      phone: data.phone,
      location: data.location || null,
      problem: data.problem || null,
      preferred_time: data.preferredTime || null,
      conversation_id: data.conversationId ?? null,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return { id: lead.id };
}

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { chatComplete, embedText, type ChatMsg } from "./ai.server";

const CLINIC_FACTS = `
Clinic: Muhammad Tanveer Physiotherapist
Location: DHA Phase 5, Karachi, Pakistan
Phone / WhatsApp: +92 342 7160092
Services: Home Physiotherapy, Dry Needling, Sports Injury Rehabilitation, Back Pain Treatment, Neck Pain Treatment, Stroke Rehabilitation, Elderly Care Physiotherapy, Post-Surgery Rehabilitation, Pain Management Therapy. Male and Female physiotherapists available.
`.trim();

const SYSTEM_PROMPT = `You are the official patient-support assistant for Muhammad Tanveer Physiotherapist clinic in DHA Phase 5, Karachi.

LANGUAGE: Auto-detect the user's language. If they write in Urdu or Roman Urdu, reply in the SAME script they used. Otherwise reply in English. Keep tone warm, professional, concise.

GROUNDING: Prefer the CLINIC KNOWLEDGE BASE excerpts below over your own knowledge. If the answer is not in the knowledge base, use the clinic facts. If you genuinely don't know, say so and offer to connect them with the clinic on WhatsApp.

SAFETY RULES (non-negotiable):
- Never diagnose conditions.
- Never prescribe medication.
- Never guarantee treatment outcomes.
- Always recommend in-person consultation with a licensed physiotherapist.
- For red-flag symptoms (sudden severe pain, loss of bowel/bladder control, numbness in legs, chest pain, stroke signs), urge the patient to seek emergency care immediately.

LEAD CAPTURE: If the patient describes a problem ("I have back pain", "need home physio", "kitne paise lagain ge", "appointment chahiye"), end your reply with the exact token [[BOOK_INTENT]] on its own line so the UI can show a booking form. Do not mention the token to the patient.

STYLE: Short paragraphs, bullet lists when useful, no markdown headers. Mention WhatsApp +92 342 7160092 when escalating.`;

export const ragChat = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
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
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
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

    // 2. Retrieve relevant chunks
    let context = "";
    try {
      const embedding = await embedText(data.message);
      const { data: chunks } = await supabaseAdmin.rpc("match_kb_chunks", {
        query_embedding: `[${embedding.join(",")}]`,
        match_count: 5,
      });
      if (chunks && chunks.length) {
        context = chunks
          .map(
            (c: { content: string; similarity: number }, i: number) =>
              `[${i + 1}] (relevance ${c.similarity.toFixed(2)})\n${c.content}`,
          )
          .join("\n\n");
      }
    } catch (e) {
      console.error("RAG retrieval failed", e);
    }

    // 3. Compose messages
    const messages: ChatMsg[] = [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "system",
        content: `CLINIC FACTS:\n${CLINIC_FACTS}\n\nCLINIC KNOWLEDGE BASE:\n${context || "(no matching entries — rely on clinic facts and ask the patient to contact us on WhatsApp for specifics)"}`,
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

    return { reply, bookIntent, conversationId };
  });

export const captureLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
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
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
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
  });

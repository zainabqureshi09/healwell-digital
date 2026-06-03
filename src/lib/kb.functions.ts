"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { embedText } from "./ai.server";
import { createClient } from "@/integrations/supabase/server";

async function getAuthenticatedUserId() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized: Invalid session");
  return user.id;
}

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

function chunkText(text: string, size = 900, overlap = 150): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= size) return [clean];
  const out: string[] = [];
  let i = 0;
  while (i < clean.length) {
    out.push(clean.slice(i, i + size));
    i += size - overlap;
  }
  return out;
}

const ingestDocumentSchema = z.object({
  title: z.string().trim().min(2).max(200),
  content: z.string().trim().min(20).max(200000),
  sourceType: z.string().max(50).default("text"),
});

export async function ingestDocument(input: z.infer<typeof ingestDocumentSchema>) {
  const data = ingestDocumentSchema.parse(input);
  const userId = await getAuthenticatedUserId();
  await assertAdmin(userId);

  const { data: doc, error } = await supabaseAdmin
    .from("kb_documents")
    .insert({
      title: data.title,
      content: data.content,
      source_type: data.sourceType,
      created_by: userId,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  const chunks = chunkText(data.content);
  const rows: Array<{
    document_id: string;
    content: string;
    embedding: string;
    chunk_index: number;
  }> = [];
  for (let i = 0; i < chunks.length; i++) {
    const emb = await embedText(chunks[i]);
    rows.push({
      document_id: doc.id,
      content: chunks[i],
      embedding: `[${emb.join(",")}]`,
      chunk_index: i,
    });
  }
  const ins = await supabaseAdmin.from("kb_chunks").insert(rows);
  if (ins.error) throw new Error(ins.error.message);
  return { id: doc.id, chunks: chunks.length };
}

export async function listDocuments() {
  const userId = await getAuthenticatedUserId();
  await assertAdmin(userId);
  const { data, error } = await supabaseAdmin
    .from("kb_documents")
    .select("id, title, source_type, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

const deleteDocumentSchema = z.object({ id: z.string().uuid() });

export async function deleteDocument(input: z.infer<typeof deleteDocumentSchema>) {
  const data = deleteDocumentSchema.parse(input);
  const userId = await getAuthenticatedUserId();
  await assertAdmin(userId);
  const { error } = await supabaseAdmin.from("kb_documents").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

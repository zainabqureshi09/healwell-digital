"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { embedText } from "./ai.server";
import { createClient } from "@/integrations/supabase/server";
import { getQdrantClient, COLLECTION_NAME, ensureCollection } from "./qdrant.server";
import { chunkText, parsePdf, parseDocx, parseHtml } from "./document-parser.server";
import { v4 as uuidv4 } from "uuid";

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

const ingestDocumentSchema = z.object({
  title: z.string().trim().min(2).max(200),
  content: z.string().trim().min(20),
  sourceType: z.string().max(50).default("text"),
  metadata: z.record(z.any()).optional(),
});

export async function ingestDocument(input: z.infer<typeof ingestDocumentSchema>) {
  const data = ingestDocumentSchema.parse(input);
  const userId = await getAuthenticatedUserId();
  await assertAdmin(userId);

  await ensureCollection();
  const qdrant = getQdrantClient();

  // 1. Store metadata in Supabase
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

  // 2. Chunk and Embed
  const chunks = chunkText(data.content);
  const points = [];

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await embedText(chunks[i]);
    points.push({
      id: uuidv4(),
      vector: embedding,
      payload: {
        document_id: doc.id,
        content: chunks[i],
        title: data.title,
        source_type: data.sourceType,
        chunk_index: i,
        ...data.metadata,
      },
    });
  }

  // 3. Upsert to Qdrant
  await qdrant.upsert(COLLECTION_NAME, {
    wait: true,
    points,
  });

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

export async function deleteDocument(input: { id: string }) {
  const userId = await getAuthenticatedUserId();
  await assertAdmin(userId);
  
  const qdrant = getQdrantClient();
  
  // 1. Delete from Qdrant
  await qdrant.delete(COLLECTION_NAME, {
    filter: {
      must: [{ key: "document_id", match: { value: input.id } }],
    },
  });

  // 2. Delete from Supabase
  const { error } = await supabaseAdmin.from("kb_documents").delete().eq("id", input.id);
  if (error) throw new Error(error.message);
  
  return { ok: true };
}

export async function processFileAndIngest(formData: FormData) {
  const file = formData.get("file") as File;
  const title = formData.get("title") as string || file.name;
  
  if (!file) throw new Error("No file provided");
  
  const buffer = Buffer.from(await file.arrayBuffer());
  let content = "";
  let sourceType = "file";

  if (file.name.endsWith(".pdf")) {
    content = await parsePdf(buffer);
    sourceType = "pdf";
  } else if (file.name.endsWith(".docx")) {
    content = await parseDocx(buffer);
    sourceType = "docx";
  } else if (file.name.endsWith(".txt")) {
    content = buffer.toString("utf-8");
    sourceType = "txt";
  } else {
    throw new Error("Unsupported file type");
  }

  return await ingestDocument({ title, content, sourceType });
}

export async function processUrlAndIngest(url: string) {
  const res = await fetch(url);
  const html = await res.text();
  const content = await parseHtml(html);
  const title = url; // or extract from meta tags
  
  return await ingestDocument({ title, content, sourceType: "url", metadata: { url } });
}

"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createClient } from "@/integrations/supabase/server";
import { getQdrantClient } from "./qdrant.server";

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
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden: Admin access required");
}

export async function isCurrentUserAdmin() {
  try {
    const userId = await getAuthenticatedUserId();
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  } catch (e) {
    return { isAdmin: false };
  }
}

export async function claimAdminIfFirst() {
  const userId = await getAuthenticatedUserId();
  const { count } = await supabaseAdmin
    .from("user_roles")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin");
  if ((count ?? 0) > 0) return { claimed: false, reason: "admin_exists" };
  const { error } = await supabaseAdmin
    .from("user_roles")
    .insert({ user_id: userId, role: "admin" });
  if (error) throw new Error(error.message);
  return { claimed: true };
}

export async function listLeads() {
  const userId = await getAuthenticatedUserId();
  await assertAdmin(userId);
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

const updateLeadStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "booked", "closed"]),
});

export async function updateLeadStatus(input: z.infer<typeof updateLeadStatusSchema>) {
  const data = updateLeadStatusSchema.parse(input);
  const userId = await getAuthenticatedUserId();
  await assertAdmin(userId);
  const { error } = await supabaseAdmin
    .from("leads")
    .update({ status: data.status })
    .eq("id", data.id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function getAnalytics() {
  const userId = await getAuthenticatedUserId();
  await assertAdmin(userId);

  const [convos, msgs, leads, docs] = await Promise.all([
    supabaseAdmin.from("conversations").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("messages").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("leads").select("status", { count: "exact" }),
    supabaseAdmin.from("kb_documents").select("*", { count: "exact", head: true }),
  ]);

  const leadStatus: Record<string, number> = {};
  (leads.data ?? []).forEach((l) => {
    leadStatus[l.status] = (leadStatus[l.status] ?? 0) + 1;
  });

  const { data: topQuestions } = await supabaseAdmin
    .from("messages")
    .select("content, created_at")
    .eq("role", "user")
    .order("created_at", { ascending: false })
    .limit(20);

  let qdrantStatus = "Disconnected";
  try {
    const qdrant = getQdrantClient();
    const collections = await qdrant.getCollections();
    if (collections) qdrantStatus = "Connected";
  } catch (e) {
    console.error("Qdrant health check failed", e);
  }

  return {
    conversations: convos.count ?? 0,
    messages: msgs.count ?? 0,
    leads: leads.count ?? 0,
    documents: docs.count ?? 0,
    leadStatus,
    recentQuestions: (topQuestions ?? []).map((q) => q.content),
    qdrantStatus,
  };
}

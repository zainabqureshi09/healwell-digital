"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

async function getAuthenticatedUserId() {
  const authHeader = (await headers()).get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If no header, we can't authenticate without cookies or other means
    // For now, we'll throw, but in a real Next.js app we'd use cookies
    throw new Error("Unauthorized: No authorization header provided");
  }

  const token = authHeader.replace("Bearer ", "");
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

  const supabase = createClient<Database>(SUPABASE_URL!, SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error || !user) throw new Error("Unauthorized: Invalid token");
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

  return {
    conversations: convos.count ?? 0,
    messages: msgs.count ?? 0,
    leads: leads.count ?? 0,
    documents: docs.count ?? 0,
    leadStatus,
    recentQuestions: (topQuestions ?? []).map((q) => q.content),
  };
}

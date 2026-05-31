import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const isCurrentUserAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  });

// Bootstrap: first signed-up user can claim admin. Idempotent.
export const claimAdminIfFirst = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) return { claimed: false, reason: "admin_exists" };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { claimed: true };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const adm = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!adm.data) throw new Error("Forbidden");
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "contacted", "booked", "closed"]),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    const adm = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!adm.data) throw new Error("Forbidden");
    const { error } = await supabaseAdmin
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const adm = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!adm.data) throw new Error("Forbidden");

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
  });

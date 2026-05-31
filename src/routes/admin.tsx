import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  isCurrentUserAdmin,
  claimAdminIfFirst,
  listLeads,
  updateLeadStatus,
  getAnalytics,
} from "@/lib/admin.functions";
import { listDocuments, ingestDocument, deleteDocument } from "@/lib/kb.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Trash2, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Admin Dashboard | Dr. Tanveer Physiotherapy" }, { name: "robots", content: "noindex" }],
  }),
});

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const claim = useServerFn(claimAdminIfFirst);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/login" });
        return;
      }
      let res = await checkAdmin();
      if (!res.isAdmin) {
        // Try to bootstrap if no admin exists
        const c = await claim();
        if (c.claimed) res = { isAdmin: true };
      }
      setIsAdmin(res.isAdmin);
      setReady(true);
    })();
  }, [checkAdmin, claim, navigate]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-6 text-center">
          <h1 className="text-lg font-semibold">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account is signed in but does not have admin permissions. Ask an existing admin to grant access.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/login" });
            }}
          >
            Sign out
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Clinic Admin</h1>
            <p className="text-sm text-muted-foreground">Manage knowledge base, leads, and analytics.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/" });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </header>

        <Tabs defaultValue="kb">
          <TabsList>
            <TabsTrigger value="kb">Knowledge Base</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="kb"><KBPanel /></TabsContent>
          <TabsContent value="leads"><LeadsPanel /></TabsContent>
          <TabsContent value="analytics"><AnalyticsPanel /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function KBPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [docs, setDocs] = useState<Array<{ id: string; title: string; source_type: string; created_at: string }>>([]);
  const list = useServerFn(listDocuments);
  const ingest = useServerFn(ingestDocument);
  const del = useServerFn(deleteDocument);

  async function refresh() {
    try {
      const d = await list();
      setDocs(d as typeof docs);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
    }
  }
  useEffect(() => { refresh(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await ingest({ data: { title, content, sourceType: "text" } });
      toast.success(`Indexed ${res.chunks} chunks.`);
      setTitle("");
      setContent("");
      refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <h2 className="font-semibold">Add knowledge</h2>
        <p className="text-xs text-muted-foreground">Paste service descriptions, FAQs, pricing notes, recovery guides, etc. Each entry is chunked and embedded for the chatbot.</p>
        <form onSubmit={submit} className="mt-3 space-y-2">
          <Input placeholder="Title (e.g. Dry Needling FAQ)" required value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Paste the content here…" required rows={12} value={content} onChange={(e) => setContent(e.target.value)} />
          <Button type="submit" disabled={busy}>
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Index document
          </Button>
        </form>
      </Card>
      <Card className="p-4">
        <h2 className="font-semibold">Indexed documents ({docs.length})</h2>
        <ul className="mt-3 space-y-2">
          {docs.map((d) => (
            <li key={d.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
              <div>
                <div className="font-medium">{d.title}</div>
                <div className="text-xs text-muted-foreground">{new Date(d.created_at).toLocaleString()}</div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={async () => {
                  if (!confirm("Delete?")) return;
                  await del({ data: { id: d.id } });
                  refresh();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
          {!docs.length && <p className="text-xs text-muted-foreground">No documents yet. Add your first entry on the left.</p>}
        </ul>
      </Card>
    </div>
  );
}

function LeadsPanel() {
  const [leads, setLeads] = useState<Array<{
    id: string; name: string; phone: string; location: string | null; problem: string | null;
    preferred_time: string | null; status: string; created_at: string;
  }>>([]);
  const list = useServerFn(listLeads);
  const upd = useServerFn(updateLeadStatus);

  async function refresh() {
    try {
      const d = await list();
      setLeads(d as typeof leads);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
    }
  }
  useEffect(() => { refresh(); }, []);

  return (
    <Card className="mt-4 p-4">
      <h2 className="font-semibold">Leads ({leads.length})</h2>
      <div className="mt-3 space-y-2">
        {leads.map((l) => (
          <div key={l.id} className="rounded-md border p-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium">{l.name} — <a href={`tel:${l.phone}`} className="text-primary">{l.phone}</a></div>
              <Badge variant={l.status === "new" ? "default" : "secondary"}>{l.status}</Badge>
            </div>
            {l.location && <div className="text-xs text-muted-foreground">📍 {l.location}</div>}
            {l.preferred_time && <div className="text-xs text-muted-foreground">🕒 {l.preferred_time}</div>}
            {l.problem && <div className="mt-1 text-xs">{l.problem}</div>}
            <div className="mt-2 flex gap-2">
              {(["new", "contacted", "booked", "closed"] as const).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={l.status === s ? "default" : "outline"}
                  onClick={async () => {
                    await upd({ data: { id: l.id, status: s } });
                    refresh();
                  }}
                >
                  {s}
                </Button>
              ))}
              <a
                href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto inline-flex items-center rounded-md border px-2 py-1 text-xs hover:bg-muted"
              >
                WhatsApp
              </a>
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">{new Date(l.created_at).toLocaleString()}</div>
          </div>
        ))}
        {!leads.length && <p className="text-xs text-muted-foreground">No leads yet.</p>}
      </div>
    </Card>
  );
}

function AnalyticsPanel() {
  const [stats, setStats] = useState<{
    conversations: number; messages: number; leads: number; documents: number;
    leadStatus: Record<string, number>; recentQuestions: string[];
  } | null>(null);
  const get = useServerFn(getAnalytics);

  useEffect(() => {
    get().then((d) => setStats(d as typeof stats)).catch((e) => toast.error(e.message));
  }, []);

  if (!stats) return <div className="mt-4 text-sm text-muted-foreground">Loading…</div>;

  const cards = [
    { label: "Conversations", value: stats.conversations },
    { label: "Messages", value: stats.messages },
    { label: "Leads", value: stats.leads },
    { label: "Documents", value: stats.documents },
  ];
  return (
    <div className="mt-4 space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-4">
            <div className="text-xs text-muted-foreground">{c.label}</div>
            <div className="mt-1 text-2xl font-bold">{c.value}</div>
          </Card>
        ))}
      </div>
      <Card className="p-4">
        <h3 className="font-semibold">Lead status</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.entries(stats.leadStatus).map(([k, v]) => (
            <Badge key={k} variant="outline">{k}: {v}</Badge>
          ))}
          {!Object.keys(stats.leadStatus).length && <p className="text-xs text-muted-foreground">No leads yet.</p>}
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">Recent patient questions</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {stats.recentQuestions.map((q, i) => <li key={i} className="border-l-2 pl-2 text-muted-foreground">{q}</li>)}
          {!stats.recentQuestions.length && <p className="text-xs text-muted-foreground">None yet.</p>}
        </ul>
      </Card>
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import {
  isCurrentUserAdmin,
  claimAdminIfFirst,
  listLeads,
  updateLeadStatus,
  getAnalytics,
} from "@/lib/admin.functions";
import { listDocuments, ingestDocument, deleteDocument, processFileAndIngest, processUrlAndIngest } from "@/lib/kb.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Trash2, LogOut, Upload, Globe, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }

      try {
        let res = await isCurrentUserAdmin();
        if (!res.isAdmin) {
          // Try to bootstrap if no admin exists
          const c = await claimAdminIfFirst();
          if (c.claimed) res = { isAdmin: true };
        }
        setIsAdmin(res.isAdmin);
      } catch (e) {
        console.error("Admin check failed", e);
      }
      setReady(true);
    })();
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md w-full p-12 border border-border shadow-premium bg-white text-center animate-fade-up">
          <h1 className="text-3xl font-display font-bold text-ink mb-4">Access Restricted</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            Your account is authenticated but lacks administrative clearance. Please contact the
            medical director for authorization.
          </p>
          <button
            className="w-full bg-primary text-white py-4 px-8 text-sm font-bold tracking-widest uppercase hover:bg-secondary transition-all duration-300"
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
          >
            Switch Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      {/* Background Medical Pattern */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "var(--pattern-medical)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-up">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Management Suite
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink">
              Clinical <span className="italic text-primary">Intelligence.</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-sm font-medium">
              Manage clinical knowledge, patient leads, and recovery analytics.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center justify-center border border-primary text-primary px-8 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
              }}
            >
              <LogOut className="mr-2 h-3.5 w-3.5" /> End Session
            </button>
          </div>
        </header>

        <Tabs defaultValue="kb" className="animate-fade-up [animation-delay:100ms]">
          <TabsList className="bg-transparent border-b border-border w-full justify-start h-auto p-0 mb-12 rounded-none gap-10">
            <TabsTrigger
              value="kb"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground data-[state=active]:text-primary transition-all"
            >
              Clinical Knowledge
            </TabsTrigger>
            <TabsTrigger
              value="leads"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground data-[state=active]:text-primary transition-all"
            >
              Patient Inquiries
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground data-[state=active]:text-primary transition-all"
            >
              Recovery Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kb" className="mt-0 outline-none">
            <KBPanel />
          </TabsContent>
          <TabsContent value="leads" className="mt-0 outline-none">
            <LeadsPanel />
          </TabsContent>
          <TabsContent value="analytics" className="mt-0 outline-none">
            <AnalyticsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function KBPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [docs, setDocs] = useState<
    Array<{ id: string; title: string; source_type: string; created_at: string }>
  >([]);

  const refresh = useCallback(async () => {
    try {
      const d = await listDocuments();
      setDocs(d as typeof docs);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function submitText(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await ingestDocument({ title, content, sourceType: "text" });
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

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await processFileAndIngest(formData);
      toast.success(`File indexed: ${res.chunks} chunks.`);
      refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function submitUrl(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await processUrlAndIngest(url);
      toast.success(`Website indexed: ${res.chunks} chunks.`);
      setUrl("");
      refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Scraping failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-white p-8 border border-border shadow-premium">
          <h2 className="text-xl font-display font-bold text-ink mb-2">Manual Entry</h2>
          <p className="text-xs text-muted-foreground mb-8">
            Add clinical knowledge or FAQs manually.
          </p>
          <form onSubmit={submitText} className="space-y-6">
            <input
              placeholder="Document Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background border-b border-border p-4 text-sm focus:border-primary focus:outline-none"
            />
            <textarea
              placeholder="Content..."
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-background border-b border-border p-4 text-sm focus:border-primary focus:outline-none resize-none"
            />
            <button
              disabled={busy}
              className="w-full bg-primary text-white py-4 px-8 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary disabled:opacity-50"
            >
              {busy ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin inline" /> : null}
              Index Text
            </button>
          </form>
        </div>

        <div className="bg-white p-8 border border-border shadow-premium">
          <h2 className="text-xl font-display font-bold text-ink mb-2">Document Upload</h2>
          <p className="text-xs text-muted-foreground mb-8">
            PDF, DOCX, or TXT (Max 10MB)
          </p>
          <div className="relative group">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              disabled={busy}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
            />
            <div className="border-2 border-dashed border-border p-12 text-center group-hover:border-primary/40 transition-colors">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-4 group-hover:text-primary" />
              <div className="text-[10px] font-bold uppercase tracking-widest">
                Click to upload or drag & drop
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border border-border shadow-premium">
          <h2 className="text-xl font-display font-bold text-ink mb-2">Web Scraper</h2>
          <p className="text-xs text-muted-foreground mb-8">
            Crawl content from a medical URL.
          </p>
          <form onSubmit={submitUrl} className="flex gap-4">
            <input
              type="url"
              placeholder="https://..."
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-background border-b border-border p-4 text-sm focus:border-primary focus:outline-none"
            />
            <button
              disabled={busy}
              className="bg-primary text-white px-8 py-4 text-[10px] font-bold uppercase hover:bg-secondary disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Globe className="h-3.5 w-3.5" />}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="bg-white p-8 border border-border shadow-premium sticky top-8">
          <h2 className="text-xl font-display font-bold text-ink mb-6">
            Clinical Repository ({docs.length})
          </h2>
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
            {docs.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between border border-border p-5 group hover:border-primary/20 transition-colors bg-background"
              >
                <div className="overflow-hidden mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    {d.source_type === "pdf" && <FileText className="h-3 w-3 text-red-500" />}
                    {d.source_type === "docx" && <FileText className="h-3 w-3 text-blue-500" />}
                    {d.source_type === "url" && <Globe className="h-3 w-3 text-primary" />}
                    <div className="font-display font-bold text-ink truncate text-sm">
                      {d.title}
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    {new Date(d.created_at).toLocaleDateString()}
                  </div>
                </div>
                <button
                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors border border-border group-hover:bg-white"
                  onClick={async () => {
                    if (!confirm("Confirm removal?")) return;
                    await deleteDocument({ id: d.id });
                    refresh();
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadsPanel() {
  const [leads, setLeads] = useState<
    Array<{
      id: string;
      name: string;
      phone: string;
      location: string | null;
      problem: string | null;
      preferred_time: string | null;
      status: string;
      created_at: string;
    }>
  >([]);

  const refresh = useCallback(async () => {
    try {
      const d = await listLeads();
      setLeads(d as typeof leads);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "text-primary border-primary/20 bg-primary/5";
      case "booked":
        return "text-secondary border-secondary/20 bg-secondary/5";
      case "contacted":
        return "text-ink border-ink/20 bg-ink/5";
      default:
        return "text-muted-foreground border-border bg-background";
    }
  };

  return (
    <div className="bg-white p-8 lg:p-12 border border-border shadow-premium">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h2 className="text-3xl font-display font-bold text-ink">
          Patient Inquiries <span className="text-primary/20 ml-2">({leads.length})</span>
        </h2>
      </div>

      <div className="grid gap-6">
        {leads.map((l) => (
          <div
            key={l.id}
            className="border border-border p-8 hover:border-primary/20 transition-all bg-background group"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xl font-display font-bold text-ink">{l.name}</span>
                  <span
                    className={`px-3 py-1 text-[9px] uppercase tracking-widest font-bold border ${getStatusColor(l.status)}`}
                  >
                    {l.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-6 items-center">
                  <a
                    href={`tel:${l.phone}`}
                    className="text-sm font-bold text-primary hover:text-secondary transition-colors underline underline-offset-4 decoration-primary/20"
                  >
                    {l.phone}
                  </a>
                  {l.location && (
                    <span className="text-xs text-muted-foreground font-medium">
                      📍 {l.location}
                    </span>
                  )}
                  {l.preferred_time && (
                    <span className="text-xs text-muted-foreground font-medium">
                      🕒 {l.preferred_time}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pt-1">
                Received: {new Date(l.created_at).toLocaleString()}
              </div>
            </div>

            {l.problem && (
              <div className="bg-white p-6 border border-border mb-8 text-sm text-ink leading-relaxed italic">
                &quot;{l.problem}&quot;
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {(["new", "contacted", "booked", "closed"] as const).map((s) => (
                <button
                  key={s}
                  className={`px-6 py-2 text-[9px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                    l.status === s
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                  onClick={async () => {
                    await updateLeadStatus({ id: l.id, status: s });
                    refresh();
                  }}
                >
                  {s}
                </button>
              ))}
              <a
                href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto bg-whatsapp text-white px-6 py-2 text-[9px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                WhatsApp Patient
              </a>
            </div>
          </div>
        ))}
        {!leads.length && (
          <p className="text-sm text-muted-foreground italic text-center py-20">
            No patient inquiries documented yet.
          </p>
        )}
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const [stats, setStats] = useState<{
    conversations: number;
    messages: number;
    leads: number;
    documents: number;
    leadStatus: Record<string, number>;
    recentQuestions: string[];
    qdrantStatus: string;
  } | null>(null);

  useEffect(() => {
    getAnalytics()
      .then((d) => setStats(d as typeof stats))
      .catch((e) => toast.error(e.message));
  }, []);

  if (!stats)
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
      </div>
    );

  const cards = [
    { label: "Patient Conversations", value: stats.conversations, icon: "💬" },
    { label: "Interaction Volume", value: stats.messages, icon: "📊" },
    { label: "Qualified Leads", value: stats.leads, icon: "👤" },
    { label: "Knowledge Assets", value: stats.documents, icon: "📑" },
  ];

  return (
    <div className="space-y-12">
      <div className="grid gap-8 sm:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-white p-10 border border-border shadow-premium group hover:border-primary/20 transition-all"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
              {c.label}
            </div>
            <div className="text-5xl font-display font-bold text-ink group-hover:text-primary transition-colors">
              {c.value}
            </div>
            <div className="text-2xl mt-4 opacity-10">{c.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="bg-white p-8 border border-border shadow-premium h-full">
            <h3 className="text-xl font-display font-bold text-ink mb-8">System Health</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                  Qdrant Vector DB
                </span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${stats.qdrantStatus === "Connected" ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="text-sm font-bold text-ink">{stats.qdrantStatus}</span>
                </div>
              </div>
              
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mt-8 mb-4">Inquiry Pipeline</h4>
              {Object.entries(stats.leadStatus).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                    {k}
                  </span>
                  <span className="text-2xl font-display font-bold text-primary">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white p-8 border border-border shadow-premium h-full">
            <h3 className="text-xl font-display font-bold text-ink mb-8">
              Recent Patient Insights
            </h3>
            <div className="grid gap-4">
              {stats.recentQuestions.map((q, i) => (
                <div
                  key={i}
                  className="bg-background p-6 border-l-4 border-primary/20 text-ink text-sm leading-relaxed font-medium"
                >
                  &quot;{q}&quot;
                </div>
              ))}
              {!stats.recentQuestions.length && (
                <p className="text-sm text-muted-foreground italic">
                  No patient questions documented yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

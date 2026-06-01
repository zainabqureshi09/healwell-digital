import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, Send, X, CalendarPlus, Loader2, Sparkles } from "lucide-react";
import { ragChat, captureLead } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string; bookIntent?: boolean };

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("dmt_chat_sid");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("dmt_chat_sid", id);
  }
  return id;
}

const SUGGESTIONS = [
  "What services do you offer?",
  "Do you provide home physiotherapy?",
  "I have back pain, can you help?",
  "How much does treatment cost?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Assalam-o-Alaikum! I'm Dr. Tanveer's clinic assistant. Ask me about physiotherapy treatments, home visits, pricing, or book an appointment. آپ اردو میں بھی بات کر سکتے ہیں۔",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [lead, setLead] = useState({
    name: "",
    phone: "",
    location: "",
    problem: "",
    preferredTime: "",
  });
  const [leadBusy, setLeadBusy] = useState(false);

  const chat = useServerFn(ragChat);
  const submitLead = useServerFn(captureLead);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, showLead]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, busy]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setInput("");
    const history = messages.slice(-10).map((m) => ({ role: m.role, content: m.content }));
    setMessages((m) => [...m, { role: "user", content }]);
    setBusy(true);
    try {
      const res = await chat({ data: { message: content, sessionId: getSessionId(), history } });
      setConversationId(res.conversationId);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: res.reply, bookIntent: res.bookIntent },
      ]);
      if (res.bookIntent) {
        setLead((l) => ({ ...l, problem: l.problem || content }));
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Sorry — ${msg}. You can reach us directly on WhatsApp: +92 342 7160092.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  async function onSubmitLead(e: React.FormEvent) {
    e.preventDefault();
    if (leadBusy) return;
    setLeadBusy(true);
    try {
      await submitLead({ data: { ...lead, conversationId } });
      toast.success("Appointment request sent. We'll contact you shortly.");
      setShowLead(false);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Thank you, ${lead.name}! Your request is logged. Our team will call you on ${lead.phone} shortly. For urgent needs WhatsApp +92 342 7160092.`,
        },
      ]);
      setLead({ name: "", phone: "", location: "", problem: "", preferredTime: "" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not submit");
    } finally {
      setLeadBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-36 right-6 z-50 flex h-14 w-14 items-center justify-center bg-primary text-white shadow-premium transition-transform hover:scale-110"
        aria-label="Open chat"
      >
        <Sparkles className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[600px] max-h-[85vh] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden border border-border bg-white shadow-premium animate-fade-up">
      <div className="flex items-center justify-between bg-primary px-6 py-4 text-white">
        <div>
          <div className="text-sm font-display font-bold uppercase tracking-widest">
            Medical Assistant
          </div>
          <div className="text-[10px] opacity-70 font-semibold uppercase tracking-tighter">
            Elite Physio Concierge
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="p-1 hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-6 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] bg-primary text-white px-4 py-3 text-sm font-medium"
                  : "max-w-[90%] whitespace-pre-wrap text-ink leading-relaxed"
              }
            >
              {m.content}
              {m.bookIntent && m.role === "assistant" && (
                <button
                  className="mt-4 w-full bg-primary text-white px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
                  onClick={() => setShowLead(true)}
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" /> Analyzing...
          </div>
        )}
        {!busy && messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="border border-border bg-background px-4 py-2 text-[10px] uppercase font-bold text-muted-foreground transition-all hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {showLead && (
          <form
            onSubmit={onSubmitLead}
            className="space-y-4 border border-primary/10 bg-background p-6"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-primary">
              Secure Booking
            </div>
            <Input
              required
              placeholder="Your name"
              value={lead.name}
              onChange={(e) => setLead({ ...lead, name: e.target.value })}
              className="bg-white border-b border-border p-3 text-xs"
            />
            <Input
              required
              placeholder="Phone (e.g. 03001234567)"
              value={lead.phone}
              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
              className="bg-white border-b border-border p-3 text-xs"
            />
            <Input
              placeholder="Area / Location in Karachi"
              value={lead.location}
              onChange={(e) => setLead({ ...lead, location: e.target.value })}
              className="bg-white border-b border-border p-3 text-xs"
            />
            <Textarea
              placeholder="Briefly describe your condition"
              value={lead.problem}
              onChange={(e) => setLead({ ...lead, problem: e.target.value })}
              rows={2}
              className="bg-white border-b border-border p-3 text-xs resize-none"
            />
            <Input
              placeholder="Preferred time (e.g. Mon evening)"
              value={lead.preferredTime}
              onChange={(e) => setLead({ ...lead, preferredTime: e.target.value })}
              className="bg-white border-b border-border p-3 text-xs"
            />

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={leadBusy}
                className="flex-1 bg-primary text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
              >
                {leadBusy ? <Loader2 className="h-3 w-3 animate-spin" /> : "Request Visit"}
              </button>
              <button
                type="button"
                onClick={() => setShowLead(false)}
                className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border bg-white p-4"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          disabled={busy}
          className="flex-1 bg-transparent text-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="text-primary hover:text-secondary transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
      <div className="border-t border-border bg-background px-6 py-3 text-[10px] text-muted-foreground uppercase tracking-tighter">
        Educational info only — not a medical diagnosis.
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, Send, X, CalendarPlus, Loader2 } from "lucide-react";
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
  const [lead, setLead] = useState({ name: "", phone: "", location: "", problem: "", preferredTime: "" });
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
      setMessages((m) => [...m, { role: "assistant", content: res.reply, bookIntent: res.bookIntent }]);
      if (res.bookIntent) {
        setLead((l) => ({ ...l, problem: l.problem || content }));
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setMessages((m) => [...m, { role: "assistant", content: `Sorry — ${msg}. You can reach us directly on WhatsApp: +92 342 7160092.` }]);
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
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform hover:scale-110"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[600px] max-h-[85vh] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl">
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
        <div>
          <div className="text-sm font-semibold">Clinic Assistant</div>
          <div className="text-xs opacity-80">Dr. Muhammad Tanveer Physiotherapy</div>
        </div>
        <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-md p-1 hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground"
                  : "max-w-[90%] whitespace-pre-wrap text-foreground"
              }
            >
              {m.content}
              {m.bookIntent && m.role === "assistant" && (
                <Button
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => setShowLead(true)}
                >
                  <CalendarPlus className="mr-2 h-4 w-4" /> Book Appointment
                </Button>
              )}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
          </div>
        )}
        {!busy && messages.length === 1 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {showLead && (
          <form onSubmit={onSubmitLead} className="space-y-2 rounded-xl border bg-muted/30 p-3">
            <div className="text-xs font-semibold text-foreground">Book an appointment</div>
            <Input required placeholder="Your name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
            <Input required placeholder="Phone (e.g. 03001234567)" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
            <Input placeholder="Area / Location in Karachi" value={lead.location} onChange={(e) => setLead({ ...lead, location: e.target.value })} />
            <Textarea placeholder="Briefly describe your problem" value={lead.problem} onChange={(e) => setLead({ ...lead, problem: e.target.value })} rows={2} />
            <Input placeholder="Preferred time (e.g. Mon evening)" value={lead.preferredTime} onChange={(e) => setLead({ ...lead, preferredTime: e.target.value })} />
            <div className="text-[10px] text-muted-foreground">
              Not a substitute for medical diagnosis. We'll contact you to confirm.
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={leadBusy} className="flex-1">
                {leadBusy ? <Loader2 className="h-3 w-3 animate-spin" /> : "Send Request"}
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowLead(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t bg-background p-2"
      >
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          disabled={busy}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={busy || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
      <div className="border-t bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
        Educational info only — not a medical diagnosis.
      </div>
    </div>
  );
}

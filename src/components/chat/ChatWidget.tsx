"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X, CalendarPlus, Loader2, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ragChat, captureLead } from "@/lib/chat.functions";
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
        "Assalam-o-Alaikum! I'm Muhammad Tanveer's clinic assistant. Ask me about physiotherapy treatments, home visits, pricing, or book an appointment. آپ اردو میں بھی بات کر سکتے ہیں۔",
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#chat") {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, showLead]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, busy]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setInput("");
    const history = messages.slice(-10).map((m) => ({ role: m.role, content: m.content }));
    setMessages((m) => [...m, { role: "user", content }]);
    setBusy(true);
    try {
      const res = await ragChat({ message: content, sessionId: getSessionId(), history });
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
      await captureLead({ ...lead, conversationId });
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50 flex h-[650px] max-h-[85vh] w-[420px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden border border-border bg-white shadow-[0_40px_100px_rgba(0,0,0,0.2)] rounded-3xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-8 py-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <div className="text-sm font-display font-black uppercase tracking-[0.2em]">
                  Medical Assistant
                </div>
              </div>
              <div className="text-[10px] opacity-60 font-black uppercase tracking-widest">
                Active Performance Concierge
              </div>
            </div>
            <button
              onClick={() => {
                window.location.hash = "";
                setOpen(false);
              }}
              aria-label="Close"
              className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-6 overflow-y-auto px-8 py-8 text-sm bg-background/30 scroll-smooth"
          >
            {messages.map((m, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex gap-3"}
              >
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] bg-primary text-white px-5 py-4 rounded-2xl rounded-tr-none shadow-lg font-medium leading-relaxed"
                      : "max-w-[85%] whitespace-pre-wrap text-ink leading-relaxed font-medium bg-white border border-border/50 p-5 rounded-2xl rounded-tl-none shadow-sm"
                  }
                >
                  {m.content}
                  {m.bookIntent && m.role === "assistant" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-5 w-full bg-secondary text-white px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-secondary/90 transition-colors shadow-lg"
                      onClick={() => setShowLead(true)}
                    >
                      Initiate Secure Booking
                    </motion.button>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0 mt-1 ml-3">
                    <User size={16} />
                  </div>
                )}
              </motion.div>
            ))}

            {busy && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Bot size={16} />
                </div>
                <div className="flex items-center gap-1.5 px-5 py-4 bg-white border border-border/50 rounded-2xl rounded-tl-none">
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            {!busy && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {SUGGESTIONS.map((s) => (
                  <motion.button
                    key={s}
                    whileHover={{ x: 5, backgroundColor: "rgba(15, 76, 129, 0.05)" }}
                    onClick={() => send(s)}
                    className="w-full text-left border border-border bg-white px-5 py-4 text-[11px] uppercase font-black text-muted-foreground transition-all hover:border-primary/30 hover:text-primary rounded-xl"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            )}

            {showLead && (
              <motion.form
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onSubmit={onSubmitLead}
                className="space-y-4 border border-primary/20 bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
                <div className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-2">
                  <CalendarPlus size={14} /> Secure Intake Form
                </div>
                <Input
                  required
                  placeholder="Patient full name"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="bg-background/50 border-none focus:ring-2 ring-primary/20 h-12 text-sm"
                />
                <Input
                  required
                  placeholder="Contact Number (WhatsApp preferred)"
                  value={lead.phone}
                  onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  className="bg-background/50 border-none focus:ring-2 ring-primary/20 h-12 text-sm"
                />
                <Input
                  placeholder="Locality (e.g. DHA Phase 6)"
                  value={lead.location}
                  onChange={(e) => setLead({ ...lead, location: e.target.value })}
                  className="bg-background/50 border-none focus:ring-2 ring-primary/20 h-12 text-sm"
                />
                <Textarea
                  placeholder="Describe your medical condition..."
                  value={lead.problem}
                  onChange={(e) => setLead({ ...lead, problem: e.target.value })}
                  rows={3}
                  className="bg-background/50 border-none focus:ring-2 ring-primary/20 text-sm resize-none"
                />

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={leadBusy}
                    className="flex-1 bg-primary text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-secondary transition-colors shadow-lg"
                  >
                    {leadBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Request Visit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLead(false)}
                    className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}
          </div>

          {/* Input Footer */}
          <div className="border-t border-border bg-white p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-4 bg-background/50 px-6 py-4 rounded-2xl border border-border/50 focus-within:border-primary/30 focus-within:ring-4 ring-primary/5 transition-all"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a medical question..."
                disabled={busy}
                className="flex-1 bg-transparent text-sm font-medium focus:outline-none placeholder:text-muted-foreground/50"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="text-primary hover:text-secondary disabled:opacity-30 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <div className="mt-4 text-center text-[9px] text-muted-foreground/50 uppercase tracking-[0.1em] font-black">
              AI Assistant · Clinical Guidance only · WhatsApp +92 342 7160092
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

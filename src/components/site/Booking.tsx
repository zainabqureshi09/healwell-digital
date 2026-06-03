"use client";

import { useState } from "react";
import { Phone, MessageCircle, MapPin, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";

export function Booking() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const service = String(fd.get("service") || "");
    const message = String(fd.get("message") || "").trim();

    if (!name || !phone) {
      toast.error("Please enter your name and phone.");
      setLoading(false);
      return;
    }

    const text = `Hi Muhammad Tanveer,%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/923427160092?text=${text}`, "_blank");
    toast.success("Opening WhatsApp — we'll confirm your booking shortly.");
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  };

  return (
    <section
      id="booking"
      className="py-24 lg:py-32 bg-background selection:bg-primary/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Secure Your Session
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight mb-8">
              Start Your <span className="italic text-primary">Recovery</span> Journey.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Personalized treatment plans for elite performance and pain-free living. Our team
              typically responds to all inquiries within 10 minutes.
            </p>

            <div className="space-y-6">
              <a href="tel:03427160092" className="flex items-center gap-6 group">
                <div className="w-14 h-14 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                    Direct Line
                  </div>
                  <div className="text-xl font-display font-bold text-ink group-hover:text-primary transition-colors">
                    0342 7160092
                  </div>
                </div>
              </a>

              <a href="https://wa.me/923427160092" className="flex items-center gap-6 group">
                <div className="w-14 h-14 border border-whatsapp/20 flex items-center justify-center text-whatsapp group-hover:bg-whatsapp group-hover:text-white transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                    Instant Chat
                  </div>
                  <div className="text-xl font-display font-bold text-ink group-hover:text-whatsapp transition-colors">
                    WhatsApp Concierge
                  </div>
                </div>
              </a>

              <div className="pt-10 border-t border-border mt-10">
                <a
                  href="tel:03427160092"
                  className="inline-flex items-center gap-3 text-destructive font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
                >
                  <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  Emergency Inquiries: Call Now
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 animate-fade-up [animation-delay:200ms]">
            <div className="bg-white p-8 lg:p-12 border border-border shadow-premium relative">
              <div className="mb-10">
                <h3 className="text-2xl font-display font-bold text-ink mb-2">
                  Request an Appointment
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fill in the details below and we'll handle the rest.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      Full Name
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="e.g. Ahmed Ali"
                      className="w-full bg-background border-b border-border p-4 text-sm focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="03XX XXXXXXX"
                      className="w-full bg-background border-b border-border p-4 text-sm focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                    Service Selection
                  </label>
                  <select
                    name="service"
                    className="w-full bg-background border-b border-border p-4 text-sm focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option>Home Physiotherapy</option>
                    <option>Back Pain Treatment</option>
                    <option>Sports Injury Rehab</option>
                    <option>Post-Surgery Rehab</option>
                    <option>Stroke Rehabilitation</option>
                    <option>Dry Needling</option>
                    <option>Elderly Care</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                    Case Details (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Briefly describe your condition or preferred timing..."
                    className="w-full bg-background border-b border-border p-4 text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-5 px-8 text-sm font-bold tracking-widest uppercase hover:bg-secondary transition-all duration-300 shadow-premium disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Confirm Request"}
                  </button>
                  <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-tighter">
                    Encrypted & Secure Submission · Direct WhatsApp Integration
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  ...rest
}: { name: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        name={name}
        {...rest}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary hover:shadow-soft transition"
    >
      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </a>
  );
}

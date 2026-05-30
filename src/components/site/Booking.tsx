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

    const text = `Hi Dr. Tanveer,%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/923427160092?text=${text}`, "_blank");
    toast.success("Opening WhatsApp — we'll confirm your booking shortly.");
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">Book Now</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Start your recovery today.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Reach out and we'll confirm your appointment within minutes. Clinic or home visit — your choice.
          </p>

          <div className="mt-8 space-y-4">
            <ContactRow icon={Phone} label="Call us" value="0342 7160092" href="tel:03427160092" />
            <ContactRow icon={MessageCircle} label="WhatsApp" value="Chat instantly" href="https://wa.me/923427160092" />
            <ContactRow icon={MapPin} label="Location" value="DHA Phase 5, Karachi" href="#contact" />
            <ContactRow icon={Mail} label="Email" value="info@drtanveer.pk" href="mailto:info@drtanveer.pk" />
          </div>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-3 rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-elegant">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Book Your Appointment</h3>
              <p className="text-sm text-muted-foreground">We typically respond within 10 minutes.</p>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Field name="name" label="Full Name" placeholder="Your name" required />
            <Field name="phone" label="Phone Number" placeholder="03XX XXXXXXX" required type="tel" />
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold">Service Needed</label>
              <select name="service" className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Home Physiotherapy</option>
                <option>Back Pain Treatment</option>
                <option>Neck Pain Treatment</option>
                <option>Sports Injury Rehabilitation</option>
                <option>Post-Surgery Rehab</option>
                <option>Stroke Rehabilitation</option>
                <option>Dry Needling</option>
                <option>Elderly Care Physiotherapy</option>
                <option>Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold">Describe Your Condition (optional)</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Briefly describe your symptoms or preferred time…"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full inline-flex items-center justify-center rounded-full bg-gradient-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold shadow-elegant hover:opacity-95 transition disabled:opacity-60"
          >
            {loading ? "Sending…" : "Request Appointment"}
          </button>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            By submitting, you'll be redirected to WhatsApp to confirm with our team.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ name, label, ...rest }: { name: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
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

function ContactRow({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href: string }) {
  return (
    <a href={href} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary hover:shadow-soft transition">
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

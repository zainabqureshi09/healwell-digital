import { ArrowRight, Phone, ShieldCheck, Star, Clock } from "lucide-react";
import hero from "@/assets/hero-physio.jpg";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-gradient-hero overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <ShieldCheck className="w-3.5 h-3.5" /> Certified Physiotherapist · DHA Phase 5, Karachi
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-[1.05]">
            Recover Faster.{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Live Pain-Free.</span>
          </h1>

          <p className="mt-5 text-lg text-muted-foreground max-w-xl text-balance">
            Expert physiotherapy by Dr. Muhammad Tanveer — at our clinic or in the comfort of your home.
            Personalized treatment for back pain, sports injuries, post-surgery rehab, and more.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold shadow-elegant hover:opacity-95 transition"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:03427160092"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:border-primary hover:text-primary transition"
            >
              <Phone className="w-4 h-4" /> 0342 7160092
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat value="5000+" label="Patients Treated" />
            <Stat value="10+" label="Years Experience" />
            <Stat value="4.9★" label="Patient Rating" />
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img
              src={hero}
              alt="Modern physiotherapy clinic in DHA Karachi"
              width={1536}
              height={1152}
              className="w-full h-full object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          </div>

          <div className="hidden sm:flex absolute -left-6 bottom-8 items-center gap-3 rounded-2xl bg-card border border-border shadow-soft px-4 py-3 animate-float">
            <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center text-primary">
              <Star className="w-5 h-5 fill-primary" />
            </div>
            <div>
              <div className="text-sm font-bold">4.9 / 5.0</div>
              <div className="text-xs text-muted-foreground">From 500+ reviews</div>
            </div>
          </div>

          <div className="hidden sm:flex absolute -right-4 top-8 items-center gap-3 rounded-2xl bg-card border border-border shadow-soft px-4 py-3 animate-float [animation-delay:1s]">
            <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center text-primary">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">Same-Day</div>
              <div className="text-xs text-muted-foreground">Home Visits</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-ink">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

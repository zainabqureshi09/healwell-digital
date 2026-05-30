import { CheckCircle2 } from "lucide-react";
import doctor from "@/assets/dr-tanveer.jpg";

const points = [
  "Doctor of Physiotherapy (DPT) — registered practitioner",
  "10+ years treating orthopedic, neuro & sports patients",
  "Specialized in dry needling & manual therapy",
  "Trusted by athletes, post-op patients & seniors",
];

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-10 blur-2xl" />
          <img
            src={doctor}
            alt="Dr. Muhammad Tanveer, Physiotherapist in Karachi"
            width={1024} height={1024}
            loading="lazy"
            className="relative rounded-3xl shadow-elegant w-full object-cover aspect-square border border-border"
          />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-card/95 backdrop-blur border border-border p-4 shadow-soft">
            <div className="text-sm font-bold">Dr. Muhammad Tanveer</div>
            <div className="text-xs text-muted-foreground">DPT · Lead Physiotherapist</div>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-primary">About the Doctor</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Meet Dr. Muhammad Tanveer — your partner in recovery.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            With over a decade of clinical experience, Dr. Tanveer combines modern physiotherapy
            techniques with personalized care. From elite athletes to elderly patients across
            Karachi, his approach focuses on root-cause treatment — not just symptom relief.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#booking" className="inline-flex items-center rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-elegant">
              Book a Session
            </a>
            <a href="#services" className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary transition">
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

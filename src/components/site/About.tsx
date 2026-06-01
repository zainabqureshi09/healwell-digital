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
    <section
      id="about"
      className="py-24 lg:py-32 bg-background selection:bg-primary/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 relative animate-fade-up">
            <div className="relative group">
              <div className="absolute -inset-6 border border-primary/5 translate-x-6 translate-y-6 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-700" />
              <div className="relative aspect-square overflow-hidden shadow-premium grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700">
                <img
                  src={doctor}
                  alt="Dr. Muhammad Tanveer, Physiotherapist in Karachi"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-primary p-8 shadow-premium hidden md:block">
                <div className="text-white font-display font-bold text-2xl leading-none">10+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-white/60 mt-2 whitespace-nowrap">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 animate-fade-up [animation-delay:200ms]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                The Practitioner
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight mb-8">
              Medical <span className="italic text-primary">Precision</span> Meets Compassionate
              Care.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-medium">
              Dr. Muhammad Tanveer is a dedicated DPT specialist committed to restoring human
              movement. His approach integrates advanced manual therapy with evidence-based
              rehabilitation, ensuring each patient receives an elite healthcare experience tailored
              to their unique physiological needs.
            </p>

            <ul className="grid sm:grid-cols-2 gap-6 mb-12">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-4">
                  <div className="w-6 h-6 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-ink leading-snug">{p}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center bg-primary text-white px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-secondary transition-all duration-300"
              >
                Inquire for Treatment
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center border border-primary text-primary px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
              >
                Clinical Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

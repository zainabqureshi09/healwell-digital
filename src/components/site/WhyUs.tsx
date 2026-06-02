import { Award, Clock, MapPin, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "Certified Expertise",
    desc: "DPT-qualified with years of hands-on clinical practice.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Plans",
    desc: "Every patient gets a custom recovery program — never templated.",
  },
  {
    icon: Clock,
    title: "Same-Day Appointments",
    desc: "Pain doesn't wait. Book today, get treated today.",
  },
  {
    icon: MapPin,
    title: "Home Visits in Karachi",
    desc: "We come to you — DHA, Clifton, Defence and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Hygienic",
    desc: "Strict clinical hygiene protocols, sterilized equipment.",
  },
  {
    icon: Sparkles,
    title: "Modern Techniques",
    desc: "Dry needling, manual therapy, electrotherapy & more.",
  },
];

export function WhyUs() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background selection:bg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Trusted Excellence
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight mb-8">
              Decade of <span className="italic text-primary">Experience</span> in Clinical
              Rehabilitation.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Muhammad Tanveer brings a wealth of knowledge and a compassionate touch to
              physiotherapy. Our practice is built on the foundation of medical integrity,
              continuous learning, and a relentless pursuit of patient recovery.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {items.slice(0, 4).map((i) => (
                <div key={i.title} className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <i.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-ink">{i.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{i.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="bg-white p-12 lg:p-16 border border-border shadow-premium relative z-10">
              <div className="space-y-12">
                <div className="flex items-end gap-6">
                  <span className="text-6xl lg:text-7xl font-display font-bold text-primary leading-none">
                    10+
                  </span>
                  <div className="mb-2">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                      Clinical Experience
                    </div>
                    <div className="text-xl font-display font-bold text-ink">
                      Years of Excellence
                    </div>
                  </div>
                </div>

                <div className="flex items-end gap-6">
                  <span className="text-6xl lg:text-7xl font-display font-bold text-primary leading-none">
                    5k+
                  </span>
                  <div className="mb-2">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                      Patient Recovery
                    </div>
                    <div className="text-xl font-display font-bold text-ink">Successful Cases</div>
                  </div>
                </div>

                <div className="pt-12 border-t border-border">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-6">
                    Certifications & Memberships
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "DPT Specialist",
                      "Certified Manual Therapist",
                      "Dry Needling Practitioner",
                      "PPTA Member",
                    ].map((cert) => (
                      <span
                        key={cert}
                        className="inline-block border border-primary/10 bg-background px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-primary"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Grid */}
            <div
              className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 pointer-events-none hidden lg:block"
              style={{
                backgroundImage: "radial-gradient(var(--primary) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

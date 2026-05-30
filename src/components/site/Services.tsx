import {
  Home, Users, Syringe, Activity, Bone, Brain,
  Heart, Stethoscope, Sparkles, PersonStanding,
} from "lucide-react";

const services = [
  { icon: Home, title: "Home Physiotherapy", desc: "Expert physio treatment delivered at your doorstep across Karachi." },
  { icon: Users, title: "Male & Female Therapists", desc: "Comfort-first care with dedicated male and female physiotherapists." },
  { icon: Syringe, title: "Dry Needling", desc: "Targeted trigger-point therapy for chronic pain and muscle knots." },
  { icon: Activity, title: "Sports Injury Rehab", desc: "Get back to peak performance with sports-specific rehabilitation." },
  { icon: Bone, title: "Back Pain Treatment", desc: "Long-term relief from lower back, disc, and posture-related pain." },
  { icon: PersonStanding, title: "Neck Pain Treatment", desc: "Cervical pain, stiffness and tension headache management." },
  { icon: Stethoscope, title: "Post-Surgery Rehab", desc: "Structured recovery after orthopedic and joint replacement surgery." },
  { icon: Brain, title: "Stroke Rehabilitation", desc: "Regain mobility and independence with neuro-physiotherapy." },
  { icon: Heart, title: "Elderly Care Physio", desc: "Gentle, dignified physiotherapy for seniors at home." },
  { icon: Sparkles, title: "Pain Management", desc: "Drug-free, evidence-based therapy plans for chronic conditions." },
];

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">Our Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Specialized physiotherapy, tailored to your recovery.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From sports injuries to stroke rehabilitation — comprehensive care backed by evidence-based practice.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-elegant hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary grid place-items-center group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-colors">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 font-bold text-base">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

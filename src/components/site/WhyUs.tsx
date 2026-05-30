import { Award, Clock, MapPin, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

const items = [
  { icon: Award, title: "Certified Expertise", desc: "DPT-qualified with years of hands-on clinical practice." },
  { icon: HeartHandshake, title: "Personalized Plans", desc: "Every patient gets a custom recovery program — never templated." },
  { icon: Clock, title: "Same-Day Appointments", desc: "Pain doesn't wait. Book today, get treated today." },
  { icon: MapPin, title: "Home Visits in Karachi", desc: "We come to you — DHA, Clifton, Defence and beyond." },
  { icon: ShieldCheck, title: "Safe & Hygienic", desc: "Strict clinical hygiene protocols, sterilized equipment." },
  { icon: Sparkles, title: "Modern Techniques", desc: "Dry needling, manual therapy, electrotherapy & more." },
];

export function WhyUs() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">Why Choose Us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Karachi's most trusted physiotherapy practice.
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-border p-6 hover:shadow-elegant hover:border-primary/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center">
                <i.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 font-bold text-lg">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

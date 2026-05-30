import { Check } from "lucide-react";
import img from "@/assets/home-physio.jpg";

const benefits = [
  "No travel — recover in familiar surroundings",
  "Ideal for elderly, post-surgery & stroke patients",
  "Full equipment brought to your home",
  "Flexible scheduling, including evenings",
  "Family can be present and involved",
  "Same quality care as the clinic",
];

export function HomePhysio() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-primary-glow">Home Physiotherapy</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Professional physiotherapy — delivered to your doorstep.
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            Karachi's leading at-home physiotherapy service. We bring the clinic to you, with the
            same expertise, equipment, and personalized treatment plans.
          </p>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary grid place-items-center mt-0.5 shrink-0">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </span>
                <span className="text-white/90 text-sm">{b}</span>
              </li>
            ))}
          </ul>
          <a href="#booking" className="mt-8 inline-flex items-center rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold shadow-elegant">
            Book Home Visit
          </a>
        </div>
        <div className="relative">
          <img src={img} alt="Home physiotherapy in Karachi" loading="lazy" width={1280} height={960}
            className="rounded-3xl shadow-elegant object-cover aspect-[4/3] w-full border border-white/10" />
        </div>
      </div>
    </section>
  );
}

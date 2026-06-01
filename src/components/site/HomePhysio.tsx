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
    <section className="py-24 lg:py-32 bg-primary text-white selection:bg-white selection:text-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-secondary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary">
                Home Rehabilitation
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight mb-8">
              Clinical Excellence, <br />
              <span className="italic text-secondary">Delivered</span> to Your Doorstep.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-10 font-medium max-w-2xl">
              We bring the highest standards of physical therapy directly to your residence across
              Karachi. Experience dignified, personalized care without the stress of travel.
            </p>

            <ul className="grid sm:grid-cols-2 gap-6 mb-12">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-4">
                  <div className="w-6 h-6 border border-secondary/30 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold text-white/90 leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <a
              href="#booking"
              className="inline-flex items-center justify-center bg-white text-primary px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-secondary hover:text-white transition-all duration-300 shadow-premium"
            >
              Book Home Assessment
            </a>
          </div>

          <div className="lg:col-span-5 relative animate-fade-up [animation-delay:200ms]">
            <div className="relative group">
              <div className="absolute -inset-6 border border-white/10 translate-x-6 translate-y-6 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-700" />
              <div className="relative aspect-[4/5] overflow-hidden shadow-2xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700">
                <img
                  src={img}
                  alt="Home physiotherapy in Karachi"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              <div className="absolute -top-8 -left-8 w-32 h-32 border border-white/5 rotate-45 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Star, Quote } from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    name: "Ayesha K.",
    role: "Back Pain Patient",
    text: "After months of chronic back pain, Muhammad Tanveer's treatment plan changed my life. Within 4 weeks I was back to normal.",
  },
  {
    name: "Imran S.",
    role: "Sports Injury",
    text: "Recovered from a knee injury in record time. His sports rehab program is genuinely world-class.",
  },
  {
    name: "Saima A.",
    role: "Home Physio (Mother)",
    text: "Booked home physiotherapy for my elderly mother after stroke. Incredibly professional, patient, and skilled.",
  },
  {
    name: "Bilal R.",
    role: "Post-Surgery",
    text: "Post-ACL surgery rehab was tough but Muhammad Tanveer kept me motivated. I'm playing football again.",
  },
  {
    name: "Hina M.",
    role: "Neck Pain",
    text: "Dry needling sessions completely resolved my chronic neck stiffness. Highly recommend.",
  },
  {
    name: "Tariq H.",
    role: "Elderly Care",
    text: "The home visits have been a blessing for my father. Compassionate, on-time, and effective.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-white selection:bg-primary/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-20 animate-fade-up">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Patient Journeys
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight">
              Stories of <span className="italic text-primary">Recovery</span> and Restored Hope.
            </h2>
          </div>
          <div className="lg:pt-10">
            <div className="flex items-center gap-4 border border-border px-8 py-6 shadow-premium bg-white">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="text-sm font-display font-bold text-ink">
                4.9 / 5.0 (500+ Reviews)
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((r, index) => (
            <div
              key={r.name}
              className={`relative p-10 lg:p-12 border border-border hover:border-primary/20 transition-all duration-500 group ${
                index === 1 ? "lg:-translate-y-12 lg:bg-background" : "bg-white"
              }`}
            >
              <Quote className="absolute top-10 right-10 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />

              <div className="relative z-10">
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>

                <blockquote className="text-lg text-ink font-medium leading-relaxed mb-10">
                  &quot;{r.text}&quot;
                </blockquote>

                <div className="flex items-center gap-4 pt-8 border-t border-border">
                  <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-lg">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-display font-bold text-ink">{r.name}</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      {r.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Trusted by patients across Karachi
            </span>
            <div className="w-20 h-[1px] bg-border" />
            <Link
              href="/#booking"
              className="text-sm font-bold text-primary uppercase tracking-widest hover:text-secondary transition-colors underline underline-offset-8"
            >
              Write a Review
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

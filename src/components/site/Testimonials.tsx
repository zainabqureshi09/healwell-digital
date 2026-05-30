import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Ayesha K.", role: "Back Pain Patient", text: "After months of chronic back pain, Dr. Tanveer's treatment plan changed my life. Within 4 weeks I was back to normal." },
  { name: "Imran S.", role: "Sports Injury", text: "Recovered from a knee injury in record time. His sports rehab program is genuinely world-class." },
  { name: "Saima A.", role: "Home Physio (Mother)", text: "Booked home physiotherapy for my elderly mother after stroke. Incredibly professional, patient, and skilled." },
  { name: "Bilal R.", role: "Post-Surgery", text: "Post-ACL surgery rehab was tough but Dr. Tanveer kept me motivated. I'm playing football again." },
  { name: "Hina M.", role: "Neck Pain", text: "Dry needling sessions completely resolved my chronic neck stiffness. Highly recommend." },
  { name: "Tariq H.", role: "Elderly Care", text: "The home visits have been a blessing for my father. Compassionate, on-time, and effective." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">Patient Stories</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              Real recoveries from real patients.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-soft">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <div className="text-sm font-semibold">4.9 / 5 · 500+ reviews</div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-all">
              <Quote className="w-7 h-7 text-primary/30" />
              <blockquote className="mt-3 text-foreground/90">{r.text}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

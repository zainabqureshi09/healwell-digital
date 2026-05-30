const steps = [
  { n: "01", title: "Book Your Visit", desc: "Call, WhatsApp, or use our online form. Same-day slots usually available." },
  { n: "02", title: "Detailed Assessment", desc: "Dr. Tanveer evaluates your condition, history, and goals in person." },
  { n: "03", title: "Custom Treatment Plan", desc: "A tailored recovery roadmap with clear milestones and timelines." },
  { n: "04", title: "Hands-On Therapy", desc: "Manual therapy, dry needling, exercises and education — at clinic or home." },
  { n: "05", title: "Track & Adjust", desc: "Progress reviews ensure you keep moving forward, faster." },
];

export function Process() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">Our Process</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            A clear path from pain to performance.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl bg-card border border-border p-6 hover:shadow-elegant transition">
              <div className="text-4xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">{s.n}</div>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    title: "Book Your Visit",
    desc: "Call, WhatsApp, or use our online form. Same-day slots usually available.",
  },
  {
    n: "02",
    title: "Detailed Assessment",
    desc: "Muhammad Tanveer evaluates your condition, history, and goals in person.",
  },
  {
    n: "03",
    title: "Custom Treatment Plan",
    desc: "A tailored recovery roadmap with clear milestones and timelines.",
  },
  {
    n: "04",
    title: "Hands-On Therapy",
    desc: "Manual therapy, dry needling, exercises and education — at clinic or home.",
  },
  {
    n: "05",
    title: "Track & Adjust",
    desc: "Progress reviews ensure you keep moving forward, faster.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="py-24 lg:py-32 bg-background selection:bg-primary/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 animate-fade-up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Methodology
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight">
              A Clear Path from <span className="italic text-primary">Pain</span> to Performance.
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-sm lg:mb-2 font-medium">
            Our structured approach ensures every step of your recovery is measured, managed, and
            masterful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {steps.map((s, index) => (
            <div
              key={s.n}
              className="relative group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col">
                <div className="text-5xl lg:text-7xl font-display font-bold text-primary/10 group-hover:text-primary/20 transition-colors mb-6">
                  {s.n}
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-4 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[1px] bg-border translate-y-[-200%]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

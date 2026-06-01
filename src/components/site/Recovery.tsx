const stories = [
  {
    before: "Couldn't walk without back pain for 6 months",
    after: "Pain-free, back to gym in 5 weeks",
    patient: "Ahmed, 42",
  },
  {
    before: "Frozen shoulder, limited arm mobility",
    after: "Full range of motion restored in 8 weeks",
    patient: "Fatima, 55",
  },
  {
    before: "Post-stroke: lost left-side movement",
    after: "Walking independently after 3 months",
    patient: "Rashid, 67",
  },
];

export function Recovery() {
  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Before &amp; After
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Recovery stories that speak for themselves.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {stories.map((s, i) => (
            <article
              key={i}
              className="rounded-2xl bg-card border border-border overflow-hidden hover:shadow-elegant transition"
            >
              <div className="p-6 border-b border-border">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Before
                </div>
                <p className="mt-2 text-foreground/90">{s.before}</p>
              </div>
              <div className="p-6 bg-primary/5">
                <div className="text-xs font-bold uppercase tracking-widest text-primary">
                  After
                </div>
                <p className="mt-2 font-semibold">{s.after}</p>
                <div className="mt-4 text-sm text-muted-foreground">— {s.patient}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

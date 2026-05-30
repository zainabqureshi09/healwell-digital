export function MapSection() {
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">Visit Us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            DHA Phase 5, Karachi.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Easy to reach, with home visits across the city.
          </p>
        </div>
        <div className="mt-10 rounded-3xl overflow-hidden border border-border shadow-elegant">
          <iframe
            title="Clinic location — DHA Phase 5, Karachi"
            src="https://www.google.com/maps?q=DHA+Phase+5+Karachi&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

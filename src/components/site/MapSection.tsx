export function MapSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-white selection:bg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 animate-fade-up">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Reach Our Clinic
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight">
              Located in the Heart of <span className="italic text-primary">DHA</span> Phase 5.
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-sm lg:mb-2 font-medium">
            Centrally located for elite care, with comprehensive home-visit services spanning the
            entire city of Karachi.
          </p>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="absolute -inset-4 border border-primary/5 translate-x-4 translate-y-4 pointer-events-none" />
          <div className="relative border border-border shadow-premium overflow-hidden">
            <iframe
              title="Clinic location — DHA Phase 5, Karachi"
              src="https://www.google.com/maps?q=DHA+Phase+5+Karachi&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

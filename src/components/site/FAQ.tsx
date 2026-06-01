import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do you offer home physiotherapy in Karachi?",
    a: "Yes — we provide professional home physiotherapy across Karachi, including DHA, Clifton, and surrounding areas. Same-day visits are usually available.",
  },
  {
    q: "How much does a session cost?",
    a: "Pricing depends on the service and location. Please call or WhatsApp 0342 7160092 for a personalized quote — no hidden charges.",
  },
  {
    q: "Do you have female physiotherapists?",
    a: "Yes, we offer both male and female physiotherapists for patient comfort and cultural preference.",
  },
  {
    q: "How many sessions will I need?",
    a: "It varies by condition. Most patients see meaningful improvement within 4–8 sessions. Dr. Tanveer will share a clear plan after assessment.",
  },
  {
    q: "Is dry needling painful?",
    a: "Most patients feel only a mild sensation. Dry needling is highly effective for muscle pain, trigger points, and chronic stiffness.",
  },
  {
    q: "Do you treat post-surgery patients?",
    a: "Absolutely. We specialize in rehabilitation after orthopedic surgery, joint replacement, ACL repair, and more.",
  },
  {
    q: "How do I book an appointment?",
    a: "Use the booking form below, WhatsApp us, or call 0342 7160092. We respond within minutes during working hours.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-white selection:bg-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
              Common Inquiries
            </span>
            <div className="w-12 h-[1px] bg-primary" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-ink mb-6">
            Everything You <span className="italic text-primary">Need</span> to Know.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent information about our physiotherapy sessions, techniques, and home
            rehabilitation services across Karachi.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="space-y-4 animate-fade-up [animation-delay:200ms]"
        >
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border bg-white px-8 py-2 transition-all duration-300 hover:border-primary/20 shadow-soft"
            >
              <AccordionTrigger className="text-left font-display font-bold text-lg text-ink hover:text-primary transition-colors py-6 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-8">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-20 p-12 border border-primary/10 bg-background text-center animate-fade-up">
          <h3 className="text-xl font-display font-bold text-ink mb-4">Still have questions?</h3>
          <p className="text-sm text-muted-foreground mb-8">
            Our concierge team is available to assist you with any specific medical or logistical
            questions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="tel:03427160092"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors underline underline-offset-8"
            >
              Call Medical Desk
            </a>
            <a
              href="https://wa.me/923427160092"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors underline underline-offset-8"
            >
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

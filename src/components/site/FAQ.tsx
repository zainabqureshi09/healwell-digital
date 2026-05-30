import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do you offer home physiotherapy in Karachi?", a: "Yes — we provide professional home physiotherapy across Karachi, including DHA, Clifton, and surrounding areas. Same-day visits are usually available." },
  { q: "How much does a session cost?", a: "Pricing depends on the service and location. Please call or WhatsApp 0342 7160092 for a personalized quote — no hidden charges." },
  { q: "Do you have female physiotherapists?", a: "Yes, we offer both male and female physiotherapists for patient comfort and cultural preference." },
  { q: "How many sessions will I need?", a: "It varies by condition. Most patients see meaningful improvement within 4–8 sessions. Dr. Tanveer will share a clear plan after assessment." },
  { q: "Is dry needling painful?", a: "Most patients feel only a mild sensation. Dry needling is highly effective for muscle pain, trigger points, and chronic stiffness." },
  { q: "Do you treat post-surgery patients?", a: "Absolutely. We specialize in rehabilitation after orthopedic surgery, joint replacement, ACL repair, and more." },
  { q: "How do I book an appointment?", a: "Use the booking form below, WhatsApp us, or call 0342 7160092. We respond within minutes during working hours." },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Questions, answered.
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-5">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

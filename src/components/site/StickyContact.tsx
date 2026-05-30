import { Phone, MessageCircle } from "lucide-react";

export function StickyContact() {
  const wa = "https://wa.me/923427160092?text=Hi%20Dr.%20Tanveer%2C%20I%27d%20like%20to%20book%20a%20physiotherapy%20appointment.";
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={wa}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full grid place-items-center text-white shadow-elegant animate-pulse-ring"
        style={{ backgroundColor: "var(--whatsapp)" }}
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      <a
        href="tel:03427160092"
        aria-label="Call now"
        className="w-14 h-14 rounded-full grid place-items-center bg-gradient-primary text-primary-foreground shadow-elegant"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}

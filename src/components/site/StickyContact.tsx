import { Phone, MessageCircle } from "lucide-react";

export function StickyContact() {
  const wa =
    "https://wa.me/923427160092?text=Hi%20Dr.%20Tanveer%2C%20I%27d%20like%20to%20book%20a%20physiotherapy%20appointment.";
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a
        href={wa}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-whatsapp text-white shadow-premium flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href="tel:03427160092"
        aria-label="Call now"
        className="w-14 h-14 bg-primary text-white shadow-premium flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}

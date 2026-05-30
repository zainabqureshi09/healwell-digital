import { Phone, MessageCircle, MapPin, Mail, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold">T</span>
            <span className="font-display font-bold text-white">Dr. Muhammad Tanveer</span>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Premium physiotherapy in Karachi — at our clinic or in your home. Recover faster, live pain-free.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full grid place-items-center bg-white/5 hover:bg-primary transition"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full grid place-items-center bg-white/5 hover:bg-primary transition"><Instagram className="w-4 h-4" /></a>
            <a href="https://wa.me/923427160092" aria-label="WhatsApp" className="w-9 h-9 rounded-full grid place-items-center bg-white/5 hover:bg-primary transition"><MessageCircle className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white">Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {["Home Physiotherapy","Back Pain Treatment","Sports Injury Rehab","Post-Surgery Rehab","Dry Needling","Stroke Rehabilitation"].map((s) => (
              <li key={s}><a href="#services" className="hover:text-white">{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#about" className="hover:text-white">About Dr. Tanveer</a></li>
            <li><a href="#process" className="hover:text-white">Treatment Process</a></li>
            <li><a href="#testimonials" className="hover:text-white">Patient Reviews</a></li>
            <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            <li><a href="#booking" className="hover:text-white">Book Appointment</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> <a href="tel:03427160092" className="hover:text-white">0342 7160092</a></li>
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> <a href="mailto:info@drtanveer.pk" className="hover:text-white">info@drtanveer.pk</a></li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-primary mt-0.5" /> DHA Phase 5, Karachi, Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap gap-3 items-center justify-between text-xs text-white/50">
          <div>© {new Date().getFullYear()} Dr. Muhammad Tanveer Physiotherapist. All rights reserved.</div>
          <div>Physiotherapist in Karachi · Home Physiotherapy · Dry Needling</div>
        </div>
      </div>
    </footer>
  );
}

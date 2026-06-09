import { Phone, MessageCircle, MapPin, Mail, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-white/90 selection:bg-white selection:text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/#top" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white flex items-center justify-center text-primary font-display text-2xl">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none text-white">
                  Muhammad Tanveer
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold mt-1">
                  Healthcare Admin & HOD
                </span>
              </div>
            </Link>
            <p className="mt-8 text-white/70 leading-relaxed text-sm max-w-sm">
              Dedicated to healthcare leadership and clinical excellence. Assistant Healthcare
              Administrator at Jamila Sultan Welfare Society and HOD Physiotherapy at Dr Essa
              Center.
            </p>
            <div className="mt-8 flex gap-4">
              {[
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/923427160092" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 hover:bg-white hover:text-primary hover:border-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="font-display font-bold text-white uppercase tracking-widest text-xs">
              Services
            </h4>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                "Home Physiotherapy",
                "Back Pain Treatment",
                "Sports Injury Rehab",
                "Post-Surgery Rehab",
                "Dry Needling",
                "Stroke Rehabilitation",
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="font-display font-bold text-white uppercase tracking-widest text-xs">
              Quick Links
            </h4>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                { label: "About Muhammad Tanveer", href: "/about" },
                { label: "Treatment Process", href: "/process" },
                { label: "Patient Reviews", href: "/testimonials" },
                { label: "FAQ", href: "/faq" },
                { label: "Book Appointment", href: "/#booking" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:ml-auto">
            <h4 className="font-display font-bold text-white uppercase tracking-widest text-xs">
              Contact
            </h4>
            <ul className="mt-8 space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center bg-white/5 text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">
                    Phone
                  </span>
                  <a
                    href="tel:03427160092"
                    className="text-white hover:text-secondary transition-colors"
                  >
                    0342 7160092
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center bg-white/5 text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">
                    Email
                  </span>
                  <a
                    href="mailto:info@drtanveer.pk"
                    className="text-white hover:text-secondary transition-colors"
                  >
                    info@drtanveer.pk
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center bg-white/5 text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">
                    Location
                  </span>
                  <span className="text-white">DHA Phase 5, Karachi, Pakistan</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">
            © {new Date().getFullYear()} Muhammad Tanveer. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">
            Premium Healthcare Excellence in Karachi
          </p>
        </div>
      </div>
    </footer>
  );
}

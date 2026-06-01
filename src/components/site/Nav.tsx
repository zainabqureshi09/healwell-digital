import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

const links: { href: string; label: string; hash?: string }[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = isHome
    ? scrolled
      ? "bg-white/95 backdrop-blur-md border-b border-border shadow-premium"
      : "bg-transparent"
    : "bg-white border-b border-border shadow-soft";

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-display text-xl">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none text-primary">
              Dr. Tanveer
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mt-1">
              Physiotherapist
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              hash={l.hash}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide [&.active]:text-primary [&.active]:font-bold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:03427160092"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors"
          >
            <Phone className="w-4 h-4" /> 0342 7160092
          </a>
          <Link
            to="/"
            hash="booking"
            className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-secondary transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden p-2 text-primary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-border animate-fade-in shadow-xl">
          <div className="px-6 py-8 space-y-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="block text-lg font-display font-semibold text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-border">
              <Link
                to="/"
                hash="booking"
                onClick={() => setOpen(false)}
                className="block text-center bg-primary text-white px-8 py-4 text-sm font-bold tracking-widest uppercase"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

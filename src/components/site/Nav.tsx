import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold">
            T
          </span>
          <span className="font-display font-bold leading-tight">
            Dr. Tanveer
            <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              Physiotherapist
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:03427160092"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            <Phone className="w-4 h-4" /> 0342 7160092
          </a>
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-full bg-gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:opacity-95 transition"
          >
            Book Appointment
          </a>
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="block text-center mt-2 rounded-full bg-gradient-primary text-primary-foreground px-5 py-3 text-sm font-semibold"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

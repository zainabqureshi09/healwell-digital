"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border/50 py-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 180 }}
            className="w-12 h-12 bg-primary flex items-center justify-center text-white font-display text-2xl shadow-lg group-hover:bg-secondary transition-colors duration-500"
          >
            T
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl leading-none text-ink tracking-tight">
              Muhammad{" "}
              <span className="text-primary group-hover:text-secondary transition-colors">
                Tanveer
              </span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black mt-1.5 opacity-60">
              Expert Physiotherapist
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l, idx) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={l.href + (l.hash ? l.hash : "")}
                className={`relative text-[11px] uppercase tracking-[0.2em] font-black transition-all hover:text-primary ${
                  pathname === l.href ? "text-primary" : "text-ink/60"
                }`}
              >
                {l.label}
                {pathname === l.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-secondary"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-8">
          <a
            href="tel:03427160092"
            className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-ink/80 hover:text-primary transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5" />
            </div>
            0342 7160092
          </a>
          <Link
            href="/#booking"
            className="group relative inline-flex items-center justify-center bg-primary text-white px-8 py-4 text-[10px] font-black tracking-[0.2em] uppercase overflow-hidden shadow-lg hover:shadow-primary/20 transition-all"
          >
            <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              Book Appointment <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden w-12 h-12 flex items-center justify-center text-primary bg-primary/5 rounded-full"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-8 py-12 space-y-6">
              {links.map((l, idx) => (
                <motion.div
                  key={l.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={l.href + (l.hash ? l.hash : "")}
                    onClick={() => setOpen(false)}
                    className={`block text-3xl font-display font-bold transition-all ${
                      pathname === l.href
                        ? "text-primary translate-x-4"
                        : "text-ink hover:text-primary"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-10 border-t border-border"
              >
                <Link
                  href="/#booking"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-primary text-white px-8 py-5 text-xs font-black tracking-[0.2em] uppercase shadow-xl"
                >
                  Book Visit Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

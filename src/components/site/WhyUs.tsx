"use client";

import {
  Award,
  Clock,
  MapPin,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const items = [
  {
    icon: Award,
    title: "Certified Expertise",
    desc: "DPT-qualified with years of hands-on clinical practice.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Plans",
    desc: "Every patient gets a custom recovery program — never templated.",
  },
  {
    icon: Clock,
    title: "Same-Day Appointments",
    desc: "Pain doesn't wait. Book today, get treated today.",
  },
  {
    icon: MapPin,
    title: "Home Visits in Karachi",
    desc: "We come to you — DHA, Clifton, Defence and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Hygienic",
    desc: "Strict clinical hygiene protocols, sterilized equipment.",
  },
  {
    icon: Sparkles,
    title: "Modern Techniques",
    desc: "Dry needling, manual therapy, electrotherapy & more.",
  },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function WhyUs() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const bgImage = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(15, 76, 129, 0.03), transparent 80%)`,
  );

  return (
    <section
      id="about"
      className="py-24 lg:py-40 bg-background selection:bg-primary/10 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: bgImage }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-[1px] bg-primary/30" />
                <span className="text-[11px] uppercase tracking-[0.4em] font-black text-primary/80">
                  Trusted Clinical Leader
                </span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-display font-bold text-ink leading-[1.1] mb-10 tracking-tighter">
                Redefining <span className="italic text-primary">Recovery</span> through Science.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12 font-medium">
                Dr. Muhammad Tanveer combines a decade of clinical mastery with a patient-centric
                philosophy. We don&apos;t just treat symptoms; we restore the bio-mechanical
                integrity of your body.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-10">
              {items.slice(0, 4).map((i, idx) => (
                <motion.div
                  key={i.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-5 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                      <i.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink tracking-tight">
                      {i.title}
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed font-medium">
                    {i.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white p-12 lg:p-20 border border-border shadow-[0_50px_100px_-20px_rgba(15,76,129,0.1)] relative z-10 overflow-hidden group"
            >
              {/* Animated background shape */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-24 -right-24 w-64 h-64 bg-primary/[0.02] rounded-full border border-primary/5"
              />

              <div className="space-y-16 relative z-10">
                <div className="flex items-end gap-8">
                  <span className="text-7xl lg:text-9xl font-display font-bold text-primary leading-none tracking-tighter">
                    <Counter value={10} suffix="+" />
                  </span>
                  <div className="mb-4">
                    <div className="text-[11px] uppercase tracking-[0.3em] font-black text-muted-foreground mb-2">
                      Clinical Excellence
                    </div>
                    <div className="text-2xl font-display font-bold text-ink">
                      Years of Practice
                    </div>
                  </div>
                </div>

                <div className="flex items-end gap-8">
                  <span className="text-7xl lg:text-9xl font-display font-bold text-secondary leading-none tracking-tighter">
                    <Counter value={5} suffix="k+" />
                  </span>
                  <div className="mb-4">
                    <div className="text-[11px] uppercase tracking-[0.3em] font-black text-muted-foreground mb-2">
                      Patient Impact
                    </div>
                    <div className="text-2xl font-display font-bold text-ink">Successful Cases</div>
                  </div>
                </div>

                <div className="pt-16 border-t border-border">
                  <div className="text-[11px] uppercase tracking-[0.3em] font-black text-muted-foreground mb-8">
                    Accredited Specialist
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "DPT Specialist",
                      "Certified Manual Therapist",
                      "Dry Needling Pro",
                      "PPTA Senior Member",
                    ].map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center gap-3 border border-primary/5 bg-background px-5 py-4 text-[10px] uppercase tracking-[0.2em] font-black text-primary/80 group-hover:border-primary/20 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Accents */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-12 -left-12 w-32 h-32 border border-primary/5 -z-10 rotate-12"
            />
            <div
              className="absolute -bottom-12 -right-12 w-48 h-48 opacity-[0.03] pointer-events-none hidden lg:block"
              style={{
                backgroundImage: "radial-gradient(var(--primary) 2px, transparent 2px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

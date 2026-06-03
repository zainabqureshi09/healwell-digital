"use client";

import {
  Home,
  Users,
  Syringe,
  Activity,
  Bone,
  Brain,
  Heart,
  Stethoscope,
  Sparkles,
  PersonStanding,
  ArrowUpRight,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const services = [
  {
    icon: Home,
    title: "Home Physiotherapy",
    desc: "Expert physio treatment delivered at your doorstep across Karachi.",
  },
  {
    icon: Users,
    title: "Male & Female Therapists",
    desc: "Comfort-first care with dedicated male and female physiotherapists.",
  },
  {
    icon: Syringe,
    title: "Dry Needling",
    desc: "Targeted trigger-point therapy for chronic pain and muscle knots.",
  },
  {
    icon: Activity,
    title: "Sports Injury Rehab",
    desc: "Get back to peak performance with sports-specific rehabilitation.",
  },
  {
    icon: Bone,
    title: "Back Pain Treatment",
    desc: "Long-term relief from lower back, disc, and posture-related pain.",
  },
  {
    icon: PersonStanding,
    title: "Neck Pain Treatment",
    desc: "Cervical pain, stiffness and tension headache management.",
  },
  {
    icon: Stethoscope,
    title: "Post-Surgery Rehab",
    desc: "Structured recovery after orthopedic and joint replacement surgery.",
  },
  {
    icon: Brain,
    title: "Stroke Rehabilitation",
    desc: "Regain mobility and independence with neuro-physiotherapy.",
  },
  {
    icon: Heart,
    title: "Elderly Care Physio",
    desc: "Gentle, dignified physiotherapy for seniors at home.",
  },
  {
    icon: Sparkles,
    title: "Pain Management",
    desc: "Drug-free, evidence-based therapy plans for chronic conditions.",
  },
];

function ServiceCard({ s, index }: { s: (typeof services)[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative p-10 lg:p-14 bg-white border border-border transition-all duration-500 hover:z-10 hover:shadow-[0_40px_80px_-20px_rgba(15,76,129,0.15)] perspective-1000"
    >
      <div style={{ transform: "translateZ(50px)" }} className="flex flex-col h-full relative">
        <div className="mb-10 relative">
          <div className="w-16 h-16 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-700 rounded-2xl rotate-3 group-hover:rotate-0">
            <s.icon className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <span className="absolute -top-6 -right-2 text-[70px] font-display font-black text-ink/[0.02] pointer-events-none select-none group-hover:text-primary/[0.05] transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-2xl font-display font-bold text-ink mb-5 group-hover:text-primary transition-colors tracking-tight">
          {s.title}
        </h3>

        <p className="text-base text-muted-foreground leading-relaxed mb-10 flex-grow font-medium">
          {s.desc}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black text-primary opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[-10px] group-hover:translate-x-0">
            Learn More <ArrowUpRight className="w-3 h-3" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-secondary group-hover:scale-150 transition-all duration-500" />
        </div>
      </div>

      {/* Hover Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="py-24 lg:py-40 bg-white selection:bg-primary/10 relative overflow-hidden"
    >
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-secondary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-[1px] bg-primary/30" />
              <span className="text-[11px] uppercase tracking-[0.4em] font-black text-primary/80">
                Clinical Excellence
              </span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-display font-bold text-ink leading-[1.1] tracking-tighter">
              World-Class <span className="italic text-primary">Physiotherapy</span> <br />
              Tailored for You.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
            className="text-muted-foreground text-xl max-w-sm lg:mb-4 leading-relaxed font-medium"
          >
            Merging manual expertise with modern clinical technology to accelerate your recovery
            journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <ServiceCard key={s.title} s={s} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-32 p-12 lg:p-20 bg-ink text-white relative overflow-hidden group"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="max-w-2xl">
              <h3 className="text-3xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                Not sure which treatment <br /> is right for you?
              </h3>
              <p className="text-white/60 text-lg font-medium">
                Our medical team provides free initial guidance via WhatsApp to help you start your
                recovery correctly.
              </p>
            </div>
            <a
              href="https://wa.me/923427160092"
              className="group relative inline-flex items-center justify-center gap-4 bg-white text-ink px-12 py-6 text-sm font-black tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:text-white"
            >
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                Consult with Specialist <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}

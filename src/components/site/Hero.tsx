"use client";

import { ArrowRight, MessageCircle, Sparkles, Activity, Heart, ShieldCheck } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <section
      id="top"
      className="relative min-h-[100vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 bg-background overflow-hidden selection:bg-primary/10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Background Elements - Optimized with lower opacity and simpler transitions */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[20%] text-primary/10"
        >
          <Activity size={80} strokeWidth={1} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[25%] left-[15%] text-secondary/10"
        >
          <Heart size={100} strokeWidth={1} />
        </motion.div>
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--primary) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* TEXT SIDE */}
          <motion.div
            variants={containerVariants}
            initial="visible"
            animate="visible"
            className="lg:col-span-7 z-10"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <div className="w-16 h-[1px] bg-primary/40" />
              <span className="text-[11px] uppercase tracking-[0.4em] font-black text-primary/80">
                Pioneering Physiotherapy in Karachi
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-9xl font-display font-bold text-ink leading-[0.95] mb-10 tracking-tighter"
            >
              Master Your <br />
              <span className="italic text-primary relative inline-block">
                Movement.
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary/30 origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12 font-medium"
            >
              Elite, bespoke rehabilitation by Dr. Muhammad Tanveer. Transforming lives through
              advanced manual therapy and precision clinical care.
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-16">
              <a
                href="#booking"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,76,129,0.3)]"
              >
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">Schedule Visit</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/923427160092"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 border-2 border-primary/20 text-primary px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase hover:border-primary hover:bg-primary hover:text-white transition-all duration-500"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                WhatsApp Direct
              </a>
            </motion.div>

            {/* Floating Stats */}
            <motion.div variants={itemVariants} className="flex items-center gap-12 flex-wrap">
              <div className="relative group">
                <div className="text-4xl font-display font-bold text-ink group-hover:text-primary transition-colors">
                  10+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-black mt-1">
                  Years Expertise
                </div>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-primary/10" />
              </div>

              <div className="relative group">
                <div className="text-4xl font-display font-bold text-ink group-hover:text-primary transition-colors">
                  5k+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-black mt-1">
                  Success Stories
                </div>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-primary/10" />
              </div>

              <a
                href="#chat"
                className="group relative flex flex-col items-start px-6 py-2 bg-secondary/5 rounded-full border border-secondary/10 hover:bg-secondary/10 transition-all"
              >
                <span className="flex items-center gap-2 text-secondary text-[11px] font-black uppercase tracking-widest">
                  AI Medical Assistant <Sparkles className="w-3 h-3 animate-pulse" />
                </span>
                <span className="text-[10px] text-muted-foreground font-bold tracking-tight">
                  Free Digital Consultation
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* IMAGE SIDE */}
          <div className="lg:col-span-5 relative perspective-1000">
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative group cursor-none"
            >
              {/* Image Container with 3D depth - Optimized: removed initial scale animation */}
              <div className="relative aspect-[4/5] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,76,129,0.3)] transition-all duration-700 group-hover:shadow-[0_80px_150px_-30px_rgba(15,76,129,0.4)]">
                <Image
                  src="/assets/dr-tanveer.jpg"
                  alt="Muhammad Tanveer - Expert Physiotherapist"
                  fill
                  className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Float Card - Front Layer */}
              <motion.div
                style={{ translateZ: 50 }}
                className="absolute -bottom-8 -left-8 bg-white p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-border max-w-[280px]"
              >
                <div className="font-display font-bold text-2xl text-primary leading-tight">
                  Muhammad Tanveer
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground mt-3 flex items-center gap-2">
                  <div className="w-4 h-[1px] bg-primary/30" /> DPT Specialist
                </div>
              </motion.div>

              {/* Decorative Frame - Mid Layer */}
              <motion.div
                style={{ translateZ: -30 }}
                className="absolute -inset-6 border-2 border-primary/5 -z-10 transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            {/* Orbiting element */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-32 h-32 border border-dashed border-primary/10 rounded-full"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}

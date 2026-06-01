import { ArrowRight, MessageCircle, Phone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import drTanveer from "@/assets/dr-tanveer.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 bg-background overflow-hidden selection:bg-primary/10"
    >
      {/* Background Medical Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "var(--pattern-medical)", backgroundSize: "100px 100px" }}
      />

      {/* Editorial Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-[1px] bg-primary/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-[1px] bg-primary/20 -rotate-45 hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 z-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Elite Physiotherapy in Karachi
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold text-ink leading-[1.1] mb-8">
              Restore Your <br />
              <span className="italic text-primary">Vitality.</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 font-medium">
              Experience handcrafted recovery with Dr. Muhammad Tanveer. Specialized care designed
              for elite performance and pain-free living, right in the heart of DHA or your own
              home.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-secondary transition-all duration-300 shadow-premium"
              >
                Schedule Appointment <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923427160092"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Now
              </a>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-display font-bold text-ink">10+</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Years Excellence
                </span>
              </div>
              <div className="w-[1px] h-10 bg-border" />
              <div className="flex flex-col">
                <span className="text-3xl font-display font-bold text-ink">5k+</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Success Stories
                </span>
              </div>
              <div className="w-[1px] h-10 bg-border" />
              <a href="#chat" className="group flex flex-col hover:opacity-80 transition-opacity">
                <span className="flex items-center gap-2 text-secondary text-sm font-bold uppercase tracking-widest">
                  AI Assistant <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-muted-foreground font-bold underline underline-offset-4 decoration-secondary/30">
                  Start Consultation
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 group">
              {/* Image Frame - Premium Editorial Feel */}
              <div className="absolute -inset-4 border border-primary/10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              <div className="relative aspect-[4/5] overflow-hidden grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 shadow-premium">
                <img
                  src={drTanveer}
                  alt="Dr. Muhammad Tanveer — Expert Physiotherapist"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              {/* Doctor Name Overlay */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-premium max-w-[240px]">
                <div className="font-display font-bold text-xl text-primary leading-tight">
                  Dr. Muhammad Tanveer
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-2">
                  DPT (Doctor of Physical Therapy)
                </div>
              </div>
            </div>

            {/* Accent Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-8 w-24 h-24 border border-secondary/20 rounded-full"
            />
            <div className="absolute -top-12 -left-12 w-32 h-32 border border-primary/10 rotate-12" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

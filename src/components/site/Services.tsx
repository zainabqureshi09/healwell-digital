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
} from "lucide-react";
import { motion } from "framer-motion";

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

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white selection:bg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Expertise & Care
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight">
              Specialized <span className="italic text-primary">Physiotherapy</span> for every stage
              of recovery.
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-sm lg:mb-2">
            Evidence-based rehabilitation plans tailored to your unique journey towards pain-free
            movement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {services.map((s, index) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className={`group relative p-10 lg:p-12 transition-all duration-500 border-border hover:bg-background ${
                index % 3 !== 2 ? "lg:border-r" : ""
              } ${index < services.length - 3 ? "lg:border-b" : ""} ${
                index % 2 !== 1 ? "md:border-r lg:border-r-0" : ""
              } border-b md:border-b-0 ${index < services.length - 2 ? "md:border-b" : ""}`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-8 relative">
                  <div className="w-14 h-14 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <s.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="absolute -top-4 -right-2 text-[60px] font-display font-bold text-ink/[0.03] pointer-events-none select-none">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-ink mb-4 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {s.desc}
                </p>

                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                  Explore Service <div className="w-8 h-[1px] bg-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Looking for something specific? Our team is here to help you find the right treatment.
          </p>
          <a
            href="https://wa.me/923427160092"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-secondary transition-all duration-300"
          >
            Consult with Dr. Tanveer
          </a>
        </motion.div>
      </div>
    </section>
  );
}

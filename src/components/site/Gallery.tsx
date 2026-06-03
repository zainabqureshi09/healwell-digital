"use client";

import { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Static array of gallery images for Next.js
const allImages = Array.from({ length: 71 }, (_, i) => {
  const index = i + 1;
  return {
    id: index,
    url: `/assets/gallery/gallery-${index}.jpeg`,
    title: `Clinical Session ${index}`,
    type: index % 3 === 0 ? "Clinic" : index % 3 === 1 ? "Treatment" : "Recovery",
    span:
      index % 6 === 0
        ? "md:col-span-2 md:row-span-2"
        : index % 6 === 2
          ? "md:col-span-2 md:row-span-1"
          : "md:col-span-1 md:row-span-1",
  };
});

const MotionImage = motion(Image);

export function Gallery({ limit }: { limit?: number }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(limit || 12);

  const visibleImages = allImages.slice(0, displayCount);
  const hasMore = !limit && displayCount < allImages.length;

  return (
    <section
      id="gallery"
      className="py-24 lg:py-40 bg-background selection:bg-primary/10 relative overflow-hidden"
    >
      {/* Background patterns */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-[1px] bg-primary/30" />
            <span className="text-[11px] uppercase tracking-[0.4em] font-black text-primary/80">
              Clinical Lens
            </span>
            <div className="w-16 h-[1px] bg-primary/30" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-display font-bold text-ink mb-10 tracking-tighter">
            Witness the <span className="italic text-primary">Standard</span> of Care.
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            A visual documentation of our dedication to movement science, handcrafted
            rehabilitation, and clinical precision in Karachi.
          </p>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]"
        >
          {visibleImages.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
              className={`group relative overflow-hidden bg-muted cursor-pointer transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] ${item.span}`}
              onClick={() => setSelectedImg(item.url)}
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/60 mb-2">
                  {item.type}
                </span>
                <h3 className="text-white font-display font-bold text-xl mb-4 tracking-tight">
                  {item.title}
                </h3>
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-primary flex items-center justify-center text-white rounded-full self-start shadow-xl"
                >
                  <Plus className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <button
              onClick={() => setDisplayCount((prev) => prev + 12)}
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-ink text-white font-black text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                Load More Assets{" "}
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        )}

        {limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <a
              href="/gallery"
              className="group relative inline-flex items-center gap-4 px-12 py-6 border-2 border-ink text-ink font-black text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:text-white"
            >
              <div className="absolute inset-0 bg-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">Full Clinical Archive</span>
            </a>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-6 backdrop-blur-xl"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-4 rounded-full">
              <X className="w-8 h-8" />
            </button>
            <div
              className="relative w-full h-full max-w-5xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <MotionImage
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                src={selectedImg}
                alt="Gallery Preview"
                fill
                className="object-contain shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-lg"
                sizes="90vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";

// Dynamically import all gallery images
const galleryImages = import.meta.glob<string>("@/assets/gallery/*.{jpeg,jpg,png}", {
  eager: true,
  query: "?url",
  import: "default",
});

const allImages = Object.values(galleryImages).map((url, index) => ({
  id: index + 1,
  url,
  title: `Clinical Session ${index + 1}`,
  type: index % 3 === 0 ? "Clinic" : index % 3 === 1 ? "Treatment" : "Recovery",
  span:
    index % 6 === 0
      ? "md:col-span-2 md:row-span-2"
      : index % 6 === 2
        ? "md:col-span-2 md:row-span-1"
        : "md:col-span-1 md:row-span-1",
}));

export function Gallery({ limit }: { limit?: number }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(limit || 12);

  const visibleImages = allImages.slice(0, displayCount);
  const hasMore = !limit && displayCount < allImages.length;

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-background selection:bg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
              Gallery
            </span>
            <div className="w-12 h-[1px] bg-primary" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-ink mb-6">
            A Glimpse into <span className="italic text-primary">Professional</span> Care.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our state-of-the-art facilities, specialized treatment sessions, and our
            commitment to providing the best physiotherapy care in Karachi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {visibleImages.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden bg-muted cursor-pointer transition-all duration-500 hover:shadow-2xl ${item.span}`}
              onClick={() => setSelectedImg(item.url)}
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/60 mb-1">
                  {item.type}
                </span>
                <h3 className="text-white font-display font-bold text-lg mb-3">{item.title}</h3>
                <div className="w-8 h-8 bg-primary flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setDisplayCount((prev) => prev + 12)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white font-bold text-sm tracking-widest uppercase hover:bg-primary transition-all duration-300 group"
            >
              View More Images
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}

        {limit && (
          <div className="mt-16 text-center">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-ink text-ink font-bold text-sm tracking-widest uppercase hover:bg-ink hover:text-white transition-all duration-300"
            >
              View Full Gallery
            </a>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImg}
            alt="Gallery Preview"
            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
          />
        </div>
      )}
    </section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Gallery } from "@/components/site/Gallery";
import { Booking } from "@/components/site/Booking";
import { MapSection } from "@/components/site/MapSection";

const title = "Best Physiotherapist in Karachi | Muhammad Tanveer — Home Physiotherapy";
const description =
  "Muhammad Tanveer — trusted physiotherapist in Karachi. Home physiotherapy, back pain, sports injury, dry needling & post-surgery rehab. Book today: 0342 7160092.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "physiotherapist in Karachi, home physiotherapy Karachi, dry needling Karachi, back pain treatment Karachi, sports injury physiotherapist Karachi, physiotherapy at home Karachi",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          name: "Muhammad Tanveer Physiotherapist",
          image: "/",
          telephone: "+92-342-7160092",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "DHA Phase 5",
            addressLocality: "Karachi",
            addressCountry: "PK",
          },
          medicalSpecialty: "Physiotherapy",
          areaServed: "Karachi",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "500",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <div className="bg-white py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-2xl font-display font-bold text-ink mb-2">Clinical Excellence</h2>
              <p className="text-sm text-muted-foreground font-medium">
                Explore our premium services and practitioner experience.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/services"
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:text-secondary transition-colors underline underline-offset-8"
              >
                Explore Services
              </Link>
              <Link
                to="/about"
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:text-secondary transition-colors underline underline-offset-8"
              >
                The Practitioner
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Gallery limit={8} />
      <Booking />
      <MapSection />
    </>
  );
}

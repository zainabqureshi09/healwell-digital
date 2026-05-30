import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { HomePhysio } from "@/components/site/HomePhysio";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { Recovery } from "@/components/site/Recovery";
import { FAQ } from "@/components/site/FAQ";
import { Booking } from "@/components/site/Booking";
import { MapSection } from "@/components/site/MapSection";
import { Footer } from "@/components/site/Footer";
import { StickyContact } from "@/components/site/StickyContact";

const title = "Best Physiotherapist in Karachi | Dr. Muhammad Tanveer — Home Physiotherapy";
const description =
  "Dr. Muhammad Tanveer — trusted physiotherapist in Karachi. Home physiotherapy, back pain, sports injury, dry needling & post-surgery rehab. Book today: 0342 7160092.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: "physiotherapist in Karachi, home physiotherapy Karachi, dry needling Karachi, back pain treatment Karachi, sports injury physiotherapist Karachi, physiotherapy at home Karachi" },
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
          name: "Dr. Muhammad Tanveer Physiotherapist",
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
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <HomePhysio />
        <Process />
        <Testimonials />
        <Recovery />
        <FAQ />
        <Booking />
        <MapSection />
      </main>
      <Footer />
      <StickyContact />
      <Toaster position="top-center" richColors />
    </div>
  );
}

import { Hero } from "@/components/site/Hero";
import { Gallery } from "@/components/site/Gallery";
import { Booking } from "@/components/site/Booking";
import { MapSection } from "@/components/site/MapSection";
import Link from "next/link";
import type { Metadata } from "next";

const title = "Muhammad Tanveer | Healthcare Administrator & HOD Physiotherapy Karachi";
const description =
  "Muhammad Tanveer — Assistant Healthcare Administrator at Jamila Sultan Welfare Society and HOD Physiotherapy at Dr Essa Center. Providing elite rehabilitation and healthcare leadership in Karachi.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "Muhammad Tanveer, Healthcare Administrator Karachi, HOD Physiotherapy, Ezaan Health, Dr Essa Physiotherapy, AKUH Alumni, Physiotherapist Karachi",
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://www.muhammadtanveer.site",
  },
};

export default function IndexPage() {
  return (
    <>
      <Hero />
      <div className="bg-white py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-2xl font-display font-bold text-ink mb-2">
                Healthcare Leadership
              </h2>
              <p className="text-sm text-muted-foreground font-medium">
                Combining administrative excellence with clinical mastery.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/services"
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:text-secondary transition-colors underline underline-offset-8"
              >
                Explore Services
              </Link>
              <Link
                href="/about"
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

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            name: "Muhammad Tanveer",
            image: "https://www.muhammadtanveer.site/assets/dr-tanveer.jpg",
            telePhone: "+92-342-7160092",
            url: "https://www.muhammadtanveer.site",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "DHA Phase 5",
              addressLocality: "Karachi",
              addressRegion: "Sindh",
              postalCode: "75500",
              addressCountry: "PK",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "24.7938",
              longitude: "67.0422",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "21:00",
              },
            ],
            medicalSpecialty: "Physiotherapy",
            description:
              "Muhammad Tanveer is an Assistant Healthcare Administrator at Jamila Sultan Welfare Society and HOD Physiotherapy Department at Dr Essa Physiotherapy and Rehabilitation Center.",
            areaServed: "Karachi",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "520",
            },
          }),
        }}
      />
    </>
  );
}

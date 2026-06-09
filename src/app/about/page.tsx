import { Metadata } from "next";
import { About as AboutSection } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { HomePhysio } from "@/components/site/HomePhysio";

export const metadata: Metadata = {
  title: "About Muhammad Tanveer | Healthcare Administrator & Physiotherapist",
  description:
    "Learn about Muhammad Tanveer, Assistant Healthcare Administrator at Jamila Sultan Welfare Society and HOD Physiotherapy at Dr Essa Center. AKUH Alumni and CEO of Ezaan Health Foundation.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
      <WhyUs />
      <HomePhysio />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Muhammad Tanveer",
            jobTitle: "Assistant Healthcare Administrator & HOD Physiotherapy",
            description:
              "Assistant Healthcare Administrator at Jamila Sultan Welfare Society, CEO of Ezaan Health, and HOD Physiotherapy at Dr Essa Center. AKUH Alumni & MSK Specialist.",
            image: "https://muhammadtanveer.site/assets/dr-tanveer.jpg",
            url: "https://muhammadtanveer.site/about",
            sameAs: [
              "https://www.facebook.com/share/your-profile",
              "https://www.instagram.com/your-profile",
            ],
            worksFor: [
              {
                "@type": "Organization",
                name: "Jamila Sultan Welfare Society",
              },
              {
                "@type": "MedicalOrganization",
                name: "Dr Essa Physiotherapy and Rehabilitation Center",
              },
              {
                "@type": "Organization",
                name: "Ezaan Health and Education Foundation",
              },
            ],
          }),
        }}
      />
    </div>
  );
}

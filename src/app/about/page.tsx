import { Metadata } from "next";
import { About as AboutSection } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { HomePhysio } from "@/components/site/HomePhysio";

export const metadata: Metadata = {
  title: "About Muhammad Tanveer | Healthcare Administrator & Physiotherapist",
  description:
    "Learn about Muhammad Tanveer, Assistant Healthcare Administrator and HOD Physiotherapy with 5+ years of expertise. Alumini of Aga Khan University Hospital.",
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
              "Healthcare administrator and MSK specialist with over 5 years of experience. CEO of Ezaan Health and Education Foundation and AKUH Alumni.",
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
            ],
          }),
        }}
      />
    </div>
  );
}

import { Metadata } from "next";
import { About as AboutSection } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { HomePhysio } from "@/components/site/HomePhysio";

export const metadata: Metadata = {
  title: "About Muhammad Tanveer | Elite Physiotherapy Karachi",
  description:
    "Learn about Muhammad Tanveer, a leading physiotherapist in Karachi with over a decade of experience in clinical rehabilitation and manual therapy.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
      <WhyUs />
      <HomePhysio />
    </div>
  );
}

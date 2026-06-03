import { Metadata } from "next";
import { Services as ServicesSection } from "@/components/site/Services";

export const metadata: Metadata = {
  title: "Clinical Services | Muhammad Tanveer Physiotherapist",
  description:
    "Explore our premium physiotherapy services in Karachi, including Dry Needling, Sports Rehab, Stroke Recovery, and Home Physiotherapy.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <ServicesSection />
    </div>
  );
}

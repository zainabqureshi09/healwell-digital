import { Metadata } from "next";
import { Services as ServicesSection } from "@/components/site/Services";

export const metadata: Metadata = {
  title: "Clinical & Rehabilitation Services | Muhammad Tanveer",
  description:
    "Comprehensive rehabilitation and clinical services in Karachi by Muhammad Tanveer. Specialized in MSK, Pain Management, and Sports Injury at home or clinic.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <ServicesSection />
    </div>
  );
}

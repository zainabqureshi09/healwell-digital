import { Metadata } from "next";
import { Process as ProcessSection } from "@/components/site/Process";

export const metadata: Metadata = {
  title: "Our Methodology | Muhammad Tanveer Physiotherapist",
  description:
    "Discover our structured clinical approach to recovery, from initial assessment to personalized treatment and peak performance.",
};

export default function ProcessPage() {
  return (
    <div className="pt-20">
      <ProcessSection />
    </div>
  );
}

import { Metadata } from "next";
import { FAQ as FAQSection } from "@/components/site/FAQ";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Muhammad Tanveer Healthcare",
  description:
    "Find answers to common questions about physiotherapy treatments, home visits, and clinic protocols in Karachi.",
};

export default function FAQPage() {
  return (
    <div className="pt-20">
      <FAQSection />
    </div>
  );
}

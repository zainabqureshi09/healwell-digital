import { Metadata } from "next";
import { Testimonials as TestimonialsSection } from "@/components/site/Testimonials";

export const metadata: Metadata = {
  title: "Patient Success Stories | Muhammad Tanveer Healthcare",
  description:
    "Read real stories of recovery and restored hope from patients treated by Muhammad Tanveer in Karachi.",
};

export default function TestimonialsPage() {
  return (
    <div className="pt-20">
      <TestimonialsSection />
    </div>
  );
}

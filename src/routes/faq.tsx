import { createFileRoute } from "@tanstack/react-router";
import { FAQ as FAQSection } from "@/components/site/FAQ";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Dr. Muhammad Tanveer" },
      {
        name: "description",
        content:
          "Find answers to common questions about physiotherapy treatments, home visits, and clinic protocols in Karachi.",
      },
    ],
  }),
});

function FAQPage() {
  return (
    <div className="pt-20">
      <FAQSection />
    </div>
  );
}

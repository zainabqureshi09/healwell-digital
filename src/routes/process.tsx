import { createFileRoute } from "@tanstack/react-router";
import { Process as ProcessSection } from "@/components/site/Process";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({
    meta: [
      { title: "Our Methodology | Dr. Muhammad Tanveer Physiotherapist" },
      {
        name: "description",
        content:
          "Discover our structured clinical approach to recovery, from initial assessment to personalized treatment and peak performance.",
      },
    ],
  }),
});

function ProcessPage() {
  return (
    <div className="pt-20">
      <ProcessSection />
    </div>
  );
}

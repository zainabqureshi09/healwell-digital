import { createFileRoute } from "@tanstack/react-router";
import { Testimonials as TestimonialsSection } from "@/components/site/Testimonials";

export const Route = createFileRoute("/testimonials")({
  component: TestimonialsPage,
  head: () => ({
    meta: [
      { title: "Patient Success Stories | Muhammad Tanveer" },
      {
        name: "description",
        content:
          "Read real stories of recovery and restored hope from patients treated by Muhammad Tanveer in Karachi.",
      },
    ],
  }),
});

function TestimonialsPage() {
  return (
    <div className="pt-20">
      <TestimonialsSection />
    </div>
  );
}

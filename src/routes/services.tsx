import { createFileRoute } from "@tanstack/react-router";
import { Services as ServicesSection } from "@/components/site/Services";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Clinical Services | Muhammad Tanveer Physiotherapist" },
      {
        name: "description",
        content:
          "Explore our premium physiotherapy services in Karachi, including Dry Needling, Sports Rehab, Stroke Recovery, and Home Physiotherapy.",
      },
    ],
  }),
});

function ServicesPage() {
  return (
    <div className="pt-20">
      <ServicesSection />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { About as AboutSection } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { HomePhysio } from "@/components/site/HomePhysio";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Dr. Muhammad Tanveer | Elite Physiotherapy Karachi" },
      {
        name: "description",
        content:
          "Learn about Dr. Muhammad Tanveer, a leading physiotherapist in Karachi with over a decade of experience in clinical rehabilitation and manual therapy.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
      <WhyUs />
      <HomePhysio />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/site/Gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Muhammad Tanveer Physiotherapist" },
      {
        name: "description",
        content:
          "View our gallery of clinical sessions, treatment facilities, and recovery progress at Muhammad Tanveer's physiotherapy clinic in Karachi.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="pt-20">
      <Gallery />
    </div>
  );
}

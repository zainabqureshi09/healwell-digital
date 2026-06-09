import { Metadata } from "next";
import { Gallery } from "@/components/site/Gallery";

export const metadata: Metadata = {
  title: "Gallery | Muhammad Tanveer Healthcare",
  description:
    "View our gallery of clinical sessions, treatment facilities, and recovery progress at Muhammad Tanveer's healthcare facility in Karachi.",
};

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <Gallery />
    </div>
  );
}

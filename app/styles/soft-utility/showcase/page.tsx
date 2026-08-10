import type { Metadata } from "next";
import ShowcaseContent from "./_content";

export const metadata: Metadata = {
  title: "Soft Utility Style Showcase | StyleKit",
  description: "Explore the Soft Utility design style showcase",
};

export default function ShowcasePage() {
  return <ShowcaseContent />;
}

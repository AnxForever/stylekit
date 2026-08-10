import type { Metadata } from "next";
import ShowcaseContent from "./_content";

export const metadata: Metadata = {
  title: "Mobile Editorial Style Showcase | StyleKit",
  description: "Explore the Mobile Editorial design style showcase",
};

export default function ShowcasePage() {
  return <ShowcaseContent />;
}

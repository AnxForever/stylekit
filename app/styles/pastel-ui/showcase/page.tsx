import type { Metadata } from "next";
import ShowcaseContent from "./_content";

export const metadata: Metadata = {
  title: "Pastel App UI Style Showcase | StyleKit",
  description: "Explore the Pastel App UI design style showcase",
};

export default function ShowcasePage() {
  return <ShowcaseContent />;
}

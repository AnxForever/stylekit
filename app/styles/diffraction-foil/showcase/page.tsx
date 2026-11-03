import type { Metadata } from "next";
import dynamicImport from "next/dynamic";

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#0c0b10]" />,
});

export const metadata: Metadata = {
  title: "Diffraction Foil Style Showcase",
  description: "Explore the Diffraction Foil design style showcase",
};

export default function ShowcasePage() {
  return <ShowcaseContent />;
}

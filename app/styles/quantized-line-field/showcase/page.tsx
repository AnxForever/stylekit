import type { Metadata } from "next";
import dynamicImport from "next/dynamic";

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#fafaf8]" />,
});

export const metadata: Metadata = {
  title: "Quantized Line Field Style Showcase",
  description: "Explore the Quantized Line Field design style showcase",
};

export default function ShowcasePage() {
  return <ShowcaseContent />;
}

import dynamic from "next/dynamic";

export const metadata = {
  title: "Risograph Showcase - StyleKit",
  description: "Live demonstration of Risograph print aesthetic with overprint offsets, halftone dots, and limited color palette.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function RisographShowcasePage() {
  return <ShowcaseContent />;
}

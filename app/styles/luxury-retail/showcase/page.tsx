import dynamic from "next/dynamic";

export const metadata = {
  title: "Luxury Retail Showcase - StyleKit",
  description: "Live demonstration of luxury retail design style with serif typography, gold accents, and premium whitespace.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#faf9f6]" />,
});

export default function LuxuryRetailShowcasePage() {
  return <ShowcaseContent />;
}

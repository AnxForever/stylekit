import dynamic from "next/dynamic";

export const metadata = {
  title: "Masonry Flow Showcase - StyleKit",
  description: "Live demonstration of Masonry Flow layout style with Pinterest-inspired waterfall card arrangements.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function MasonryFlowShowcasePage() {
  return <ShowcaseContent />;
}

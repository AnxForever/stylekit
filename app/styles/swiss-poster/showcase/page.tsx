import dynamic from "next/dynamic";

export const metadata = {
  title: "Swiss Poster Showcase - StyleKit",
  description: "Live demonstration of Swiss Poster style with bold typography, grid alignment, and primary color blocks.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SwissPosterShowcasePage() {
  return <ShowcaseContent />;
}

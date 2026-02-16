import dynamic from "next/dynamic";

export const metadata = {
  title: "Swiss International Showcase - StyleKit",
  description: "Live demonstration of Swiss International Style with grid systems, Helvetica typography, and rational design.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SwissStyleShowcasePage() {
  return <ShowcaseContent />;
}

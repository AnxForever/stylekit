import dynamic from "next/dynamic";

export const metadata = {
  title: "Split Screen Showcase - StyleKit",
  description: "Live demonstration of Split Screen layout style with contrasting left-right panel arrangements.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SplitScreenShowcasePage() {
  return <ShowcaseContent />;
}

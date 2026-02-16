import dynamic from "next/dynamic";

export const metadata = {
  title: "Z-Pattern Layout Showcase - StyleKit",
  description: "Live demonstration of Z-Pattern Layout with visual path optimization for landing pages.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function ZPatternLayoutShowcasePage() {
  return <ShowcaseContent />;
}

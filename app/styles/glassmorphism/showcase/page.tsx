import dynamic from "next/dynamic";

export const metadata = {
  title: "Glassmorphism Showcase - StyleKit",
  description: "Live demonstration of Glassmorphism design style with frosted glass effects and backdrop blur.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function GlassmorphismShowcasePage() {
  return <ShowcaseContent />;
}

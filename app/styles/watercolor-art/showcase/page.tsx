import dynamic from "next/dynamic";

export const metadata = {
  title: "Watercolor Art Showcase - StyleKit",
  description: "Live demonstration of Watercolor Art style with soft washes, transparent colors, paper texture, and elegant typography.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function WatercolorArtShowcasePage() {
  return <ShowcaseContent />;
}

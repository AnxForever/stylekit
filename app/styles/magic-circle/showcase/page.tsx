import dynamic from "next/dynamic";

export const metadata = {
  title: "Magic Circle Showcase - StyleKit",
  description: "Live demonstration of Magic Circle style with mystical geometries, golden glow effects, and arcane rune aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function MagicCircleShowcasePage() {
  return <ShowcaseContent />;
}

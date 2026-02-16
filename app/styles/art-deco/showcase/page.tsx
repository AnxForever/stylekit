import dynamic from "next/dynamic";

export const metadata = {
  title: "Art Deco Showcase - StyleKit",
  description: "Live demonstration of Art Deco aesthetic with golden accents, geometric symmetry, and elegant luxury.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function ArtDecoShowcasePage() {
  return <ShowcaseContent />;
}

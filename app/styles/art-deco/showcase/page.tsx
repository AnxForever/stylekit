import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Art Deco Showcase - StyleKit",
  description: "Live demonstration of Art Deco aesthetic with golden accents, geometric symmetry, and elegant luxury.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function ArtDecoShowcasePage() {
  return <ShowcaseContent />;
}

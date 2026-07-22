import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Parallax Editorial Showcase - StyleKit",
  description:
    "Editorial layout with physical depth: transform-only parallax layers, sticky image-text interlock, chapter numbers and drop caps on warm paper. Live Parallax Editorial demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center">
      <p className="text-[#1A1712]/40 font-serif italic text-lg">Setting the press...</p>
    </div>
  ),
});

export default function ParallaxEditorialShowcasePage() {
  return <ShowcaseContent />;
}

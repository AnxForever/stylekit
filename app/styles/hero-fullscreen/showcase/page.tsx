import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Hero Fullscreen Showcase - StyleKit",
  description: "Live demonstration of Fullscreen Hero layout style with immersive full-viewport visuals.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function HeroFullscreenShowcasePage() {
  return <ShowcaseContent />;
}

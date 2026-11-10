import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Liquid Glass Showcase - StyleKit",
  description: "Move a clear glass lens over a glacier photograph, contours, and a grid. Compare live edge refraction with soft frost, with keyboard controls and accessible fallbacks.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function LiquidGlassShowcasePage() {
  return <ShowcaseContent />;
}

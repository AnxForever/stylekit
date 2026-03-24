import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Liquid Glass Showcase - StyleKit",
  description: "Live demonstration of Apple Liquid Glass design style with rainbow edge refraction, fluid animations, and multi-layer glass stacking.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function LiquidGlassShowcasePage() {
  return <ShowcaseContent />;
}

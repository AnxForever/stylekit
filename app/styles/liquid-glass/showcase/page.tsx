import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Liquid Glass Showcase - StyleKit",
  description: "Touch Liquid Glass: press-responsive glass surfaces, velocity-driven stretch, draggable lenses, springing selectors, refractive cards, and interactive controls across a complete glass interface.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function LiquidGlassShowcasePage() {
  return <ShowcaseContent />;
}

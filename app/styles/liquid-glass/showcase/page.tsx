import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Liquid Glass Showcase - StyleKit",
  description: "Explore a complete Liquid Glass travel experience: immersive Iceland photography, refractive navigation, destination cards, search, collections, a day-by-day itinerary, and interactive controls.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function LiquidGlassShowcasePage() {
  return <ShowcaseContent />;
}

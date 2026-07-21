import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Nocturne Glassmorphism Showcase - StyleKit",
  description:
    "Colorless glass over deep night scenes: gaussian blur, directional edge light, film grain, and a single champagne accent. Live Nocturne Glassmorphism demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function GlassmorphismShowcasePage() {
  return <ShowcaseContent />;
}

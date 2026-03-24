import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Synthwave Showcase - StyleKit",
  description: "Live demonstration of Synthwave aesthetic with neon glow, grid floors, sunset gradients, and retro-futuristic vibes.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SynthwaveShowcasePage() {
  return <ShowcaseContent />;
}

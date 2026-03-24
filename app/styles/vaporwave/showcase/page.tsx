import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Vaporwave Showcase - StyleKit",
  description: "Live demonstration of Vaporwave aesthetic with neon colors, grid floors, and retro-futuristic vibes.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function VaporwaveShowcasePage() {
  return <ShowcaseContent />;
}

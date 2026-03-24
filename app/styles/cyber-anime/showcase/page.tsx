import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Cyber Anime Showcase - StyleKit",
  description: "Live demonstration of Cyber Anime style with neon glow effects, holographic panels, and sci-fi UI elements on dark backgrounds.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function CyberAnimeShowcasePage() {
  return <ShowcaseContent />;
}

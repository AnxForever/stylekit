import dynamic from "next/dynamic";

export const metadata = {
  title: "Cyber Anime Showcase - StyleKit",
  description: "Live demonstration of Cyber Anime style with neon glow effects, holographic panels, and sci-fi UI elements on dark backgrounds.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function CyberAnimeShowcasePage() {
  return <ShowcaseContent />;
}

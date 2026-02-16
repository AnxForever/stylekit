import dynamic from "next/dynamic";

export const metadata = {
  title: "Neon Samurai Showcase - StyleKit",
  description: "Live demonstration of Neon Samurai style with neon glow effects, sharp geometry, and Japanese-cyberpunk fusion aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function NeonSamuraiShowcasePage() {
  return <ShowcaseContent />;
}

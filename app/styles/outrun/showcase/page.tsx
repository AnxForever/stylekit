import dynamic from "next/dynamic";

export const metadata = {
  title: "Outrun Showcase - StyleKit",
  description: "Live demonstration of Outrun aesthetic with neon glow, sunset gradients, grid floors, and retro-futuristic vibes.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function OutrunShowcasePage() {
  return <ShowcaseContent />;
}

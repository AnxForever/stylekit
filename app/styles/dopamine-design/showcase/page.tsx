import dynamic from "next/dynamic";

export const metadata = {
  title: "Dopamine Design Showcase - StyleKit",
  description:
    "Live demonstration of Dopamine Design: high-saturation neon colors, bold typography, pill-shaped buttons, colored shadows, and joyful energy.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function DopamineDesignShowcase() {
  return <ShowcaseContent />;
}

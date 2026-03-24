import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Dopamine Design Showcase - StyleKit",
  description:
    "Live demonstration of Dopamine Design: high-saturation neon colors, bold typography, pill-shaped buttons, colored shadows, and joyful energy.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function DopamineDesignShowcase() {
  return <ShowcaseContent />;
}

import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Watercolor Style Showcase - StyleKit",
  description: "Live demonstration of Watercolor design style with soft gradients, artistic bleeds, and painterly aesthetics.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function WatercolorStyleShowcasePage() {
  return <ShowcaseContent />;
}

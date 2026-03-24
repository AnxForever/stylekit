import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Sketch Style Showcase - StyleKit",
  description: "Live demonstration of Sketch/Hand-drawn design style with pencil textures and organic lines.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SketchStyleShowcasePage() {
  return <ShowcaseContent />;
}

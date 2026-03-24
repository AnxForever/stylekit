import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Claymorphism Showcase - StyleKit",
  description: "Live demonstration of Claymorphism design style with soft 3D clay-like effects and candy colors.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function ClaymorphismShowcasePage() {
  return <ShowcaseContent />;
}

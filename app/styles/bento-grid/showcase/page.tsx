import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Bento Grid Showcase - StyleKit",
  description: "Live demonstration of Bento Grid layout style with irregular card arrangements inspired by Japanese bento boxes.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function BentoGridShowcasePage() {
  return <ShowcaseContent />;
}

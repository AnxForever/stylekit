import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Split Screen Showcase - StyleKit",
  description: "Live demonstration of Split Screen layout style with contrasting left-right panel arrangements.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SplitScreenShowcasePage() {
  return <ShowcaseContent />;
}

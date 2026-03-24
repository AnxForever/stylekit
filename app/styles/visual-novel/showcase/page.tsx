import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Visual Novel Showcase - StyleKit",
  description: "Live demonstration of Visual Novel game UI aesthetic with dialog boxes, choice buttons, and narrative panels.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function VisualNovelShowcasePage() {
  return <ShowcaseContent />;
}

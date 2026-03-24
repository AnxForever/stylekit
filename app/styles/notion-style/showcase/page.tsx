import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Notion Style Showcase - StyleKit",
  description: "Live demonstration of Notion-inspired design style with minimal aesthetics and clean typography.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function NotionStyleShowcasePage() {
  return <ShowcaseContent />;
}

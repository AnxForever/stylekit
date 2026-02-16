import dynamic from "next/dynamic";

export const metadata = {
  title: "Notion Style Showcase - StyleKit",
  description: "Live demonstration of Notion-inspired design style with minimal aesthetics and clean typography.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function NotionStyleShowcasePage() {
  return <ShowcaseContent />;
}

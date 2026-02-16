import dynamic from "next/dynamic";

export const metadata = {
  title: "Memphis Showcase - StyleKit",
  description: "Live demonstration of Memphis design style with bold geometric shapes, vibrant colors, and playful patterns.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function MemphisShowcasePage() {
  return <ShowcaseContent />;
}

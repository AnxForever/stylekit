import dynamic from "next/dynamic";

export const metadata = {
  title: "Cyber Chinese Showcase - StyleKit",
  description: "Live demonstration of Cyber Chinese aesthetic with neon-infused traditional Chinese elements, vermilion and gold palette, and cyberpunk fusion.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function CyberChineseShowcasePage() {
  return <ShowcaseContent />;
}

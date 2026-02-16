import dynamic from "next/dynamic";

export const metadata = {
  title: "Cyber Wafuu Showcase - StyleKit",
  description: "Live demonstration of Cyber Wafuu style with digitalized Japanese patterns, origami geometry, and tech-tradition fusion.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function CyberWafuuShowcasePage() {
  return <ShowcaseContent />;
}

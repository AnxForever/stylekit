import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Cyber Wafuu Showcase - StyleKit",
  description: "Live demonstration of Cyber Wafuu style with digitalized Japanese patterns, origami geometry, and tech-tradition fusion.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function CyberWafuuShowcasePage() {
  return <ShowcaseContent />;
}

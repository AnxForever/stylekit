import dynamic from "next/dynamic";

export const metadata = {
  title: "Gothic Showcase - StyleKit",
  description: "Live demonstration of Gothic aesthetic with cathedral arches, gold ornaments, dark purple and blood red tones.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function GothicShowcasePage() {
  return <ShowcaseContent />;
}

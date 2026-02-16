import dynamic from "next/dynamic";

export const metadata = {
  title: "Gothic Lolita Showcase - StyleKit",
  description: "Live demonstration of Gothic Lolita aesthetic with Victorian lace, dark elegance, ornate borders, and romantic dark palette.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function GothicLolitaShowcasePage() {
  return <ShowcaseContent />;
}

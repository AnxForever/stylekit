import dynamic from "next/dynamic";

export const metadata = {
  title: "Apple Style Showcase - StyleKit",
  description: "Live demonstration of Apple-inspired design style with minimal elegance and premium aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function AppleStyleShowcasePage() {
  return <ShowcaseContent />;
}

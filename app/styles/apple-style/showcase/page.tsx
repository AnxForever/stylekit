import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Apple Style Showcase - StyleKit",
  description: "Live demonstration of Apple-inspired design style with minimal elegance and premium aesthetics.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function AppleStyleShowcasePage() {
  return <ShowcaseContent />;
}

import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "F-Pattern Layout Showcase - StyleKit",
  description: "Live demonstration of F-Pattern Layout with eye-tracking optimized content structure.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function FPatternLayoutShowcasePage() {
  return <ShowcaseContent />;
}

import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Japanese Fresh Showcase - StyleKit",
  description: "Live demonstration of Japanese Fresh style with gentle colors, ample white space, and a clean healing aesthetic.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function JapaneseFreshShowcasePage() {
  return <ShowcaseContent />;
}

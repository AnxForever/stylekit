import dynamic from "next/dynamic";

export const metadata = {
  title: "Japanese Fresh Showcase - StyleKit",
  description: "Live demonstration of Japanese Fresh style with gentle colors, ample white space, and a clean healing aesthetic.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function JapaneseFreshShowcasePage() {
  return <ShowcaseContent />;
}

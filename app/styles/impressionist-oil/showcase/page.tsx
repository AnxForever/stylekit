import dynamic from "next/dynamic";

export const metadata = {
  title: "Impressionist Oil Showcase - StyleKit",
  description: "Live demonstration of Impressionist Oil style with bold brushstrokes, warm canvas textures, and light-and-shadow effects.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function ImpressionistOilShowcasePage() {
  return <ShowcaseContent />;
}

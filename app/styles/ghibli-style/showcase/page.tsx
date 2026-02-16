import dynamic from "next/dynamic";

export const metadata = {
  title: "Ghibli Style Showcase - StyleKit",
  description: "Live demonstration of Ghibli-inspired design with warm colors, dreamy atmosphere, and natural elements.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function GhibliStyleShowcasePage() {
  return <ShowcaseContent />;
}

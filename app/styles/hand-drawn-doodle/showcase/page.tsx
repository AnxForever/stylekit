import dynamic from "next/dynamic";

export const metadata = {
  title: "Hand-Drawn Doodle Showcase - StyleKit",
  description: "Live demonstration of Hand-Drawn Doodle style with sketchy borders, marker colors, and hand-crafted charm.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function HandDrawnDoodleShowcasePage() {
  return <ShowcaseContent />;
}

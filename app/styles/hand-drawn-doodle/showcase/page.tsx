import dynamic from "next/dynamic";

export const metadata = {
  title: "Hand-Drawn Doodle Style Showcase",
  description: "Playful hand-drawn illustrations and sketchy doodles showcase",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

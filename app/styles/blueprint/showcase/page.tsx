import dynamic from "next/dynamic";

export const metadata = {
  title: "Blueprint Showcase - StyleKit",
  description: "Live demonstration of Blueprint design with engineering grid patterns, white-line diagrams, and technical annotation markers.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

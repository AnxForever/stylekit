import dynamic from "next/dynamic";

export const metadata = {
  title: "Wabi-Sabi Showcase - StyleKit",
  description: "Live demonstration of Wabi-Sabi design with zen aesthetics, imperfect beauty, and mindful whitespace.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

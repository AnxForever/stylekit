import dynamic from "next/dynamic";

export const metadata = {
  title: "Monochrome Showcase - StyleKit",
  description:
    "Live demonstration of Monochrome design with pure grayscale hierarchy, bold typography contrast, and generous negative space.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

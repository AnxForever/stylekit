import dynamic from "next/dynamic";

export const metadata = {
  title: "Maximalism Showcase - StyleKit",
  description:
    "Live demonstration of Maximalism design with layered decorations, gradient backgrounds, multi-layer shadows, and mixed typography.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

import dynamic from "next/dynamic";

export const metadata = {
  title: "Mid-Century Modern Showcase - StyleKit",
  description:
    "Live demonstration of Mid-Century Modern design with atomic age optimism, organic curves, and warm saturated colors.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

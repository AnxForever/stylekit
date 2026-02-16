import dynamic from "next/dynamic";

export const metadata = {
  title: "Full Page Scroll Showcase - StyleKit",
  description: "Live demonstration of Full Page Scroll layout with immersive full-viewport sections and snap scrolling.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function FullPageScrollShowcasePage() {
  return <ShowcaseContent />;
}

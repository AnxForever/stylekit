import dynamic from "next/dynamic";

export const metadata = {
  title: "Vertical Timeline Showcase - StyleKit",
  description: "Live demonstration of Vertical Timeline layout for displaying chronological events and milestones.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function TimelineVerticalShowcasePage() {
  return <ShowcaseContent />;
}

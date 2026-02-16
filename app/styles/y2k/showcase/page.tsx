import dynamic from "next/dynamic";

export const metadata = {
  title: "Y2K Showcase - StyleKit",
  description: "Live demonstration of Y2K aesthetic with metallic gradients, bubbles, and millennium vibes.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Y2KShowcasePage() {
  return <ShowcaseContent />;
}

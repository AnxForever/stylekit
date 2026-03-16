import dynamic from "next/dynamic";

export const metadata = {
  title: "Linear Style Showcase - StyleKit",
  description:
    "Live demonstration of Linear Style: precise dark UI, restrained typography, subtle borders, and developer-focused aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function LinearStyleShowcase() {
  return <ShowcaseContent />;
}

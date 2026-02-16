import dynamic from "next/dynamic";

export const metadata = {
  title: "Acid Graphics Showcase - StyleKit",
  description: "Live demonstration of Acid Graphics style with fluorescent colors, distorted aesthetics, and psychedelic visuals on dark backgrounds.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function AcidGraphicsShowcasePage() {
  return <ShowcaseContent />;
}

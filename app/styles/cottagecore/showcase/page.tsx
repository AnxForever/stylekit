import dynamic from "next/dynamic";

export const metadata = {
  title: "Cottagecore Showcase - StyleKit",
  description: "Live demonstration of Cottagecore aesthetic with floral patterns, warm earth tones, and cozy countryside vibes.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function CottagecoreShowcasePage() {
  return <ShowcaseContent />;
}

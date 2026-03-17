import dynamic from "next/dynamic";

export const metadata = {
  title: "Card Flip Showcase - StyleKit",
  description: "Live demonstration of Card Flip animation style with 3D flip effects and number tickers.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function CardFlipShowcasePage() {
  return <ShowcaseContent />;
}

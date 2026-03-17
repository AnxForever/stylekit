import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#fef9f0]" />,
});

export default function FreshMarketShowcase() {
  return <ShowcaseContent />;
}

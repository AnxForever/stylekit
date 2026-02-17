import dynamic from "next/dynamic";

const GenerativeArtShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#0a0a0a]" />,
});

export default function GenerativeArtShowcasePage() {
  return <GenerativeArtShowcaseContent />;
}

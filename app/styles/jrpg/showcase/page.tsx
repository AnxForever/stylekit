import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-[#fbbf24] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-bold text-[#fbbf24] text-xl">Now Loading...</p>
      </div>
    </div>
  ),
});

export default function JrpgShowcase() {
  return <ShowcaseContent />;
}

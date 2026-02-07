import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#ffff00] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-[#ff0066] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-bold text-[#ff0066] text-2xl uppercase">Loading!</p>
      </div>
    </div>
  ),
});

export default function PopArtShowcase() {
  return <ShowcaseContent />;
}

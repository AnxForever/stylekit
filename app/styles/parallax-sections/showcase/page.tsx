import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#1e3a5f] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-white/50 border-t-white rounded-full animate-spin mb-4" />
        <p className="text-white/80 text-xl">Loading...</p>
      </div>
    </div>
  ),
});

export default function ParallaxSectionsShowcase() {
  return <ShowcaseContent />;
}

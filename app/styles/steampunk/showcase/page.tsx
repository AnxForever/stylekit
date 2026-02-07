import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#2d1810] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-[#b87333] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-[#b87333] text-xl">Loading...</p>
      </div>
    </div>
  ),
});

export default function SteampunkShowcase() {
  return <ShowcaseContent />;
}

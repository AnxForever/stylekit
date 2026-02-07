import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-[#0f0f0f] border-t-transparent animate-spin mb-4" />
        <p className="font-bold text-[#0f0f0f] text-xl uppercase tracking-widest">Loading</p>
      </div>
    </div>
  ),
});

export default function AsymmetricGridShowcase() {
  return <ShowcaseContent />;
}

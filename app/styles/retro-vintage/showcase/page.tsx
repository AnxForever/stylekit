import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#f5e6d3] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-[#8b4513] border-t-transparent animate-spin mb-4" />
        <p className="font-serif text-xl text-[#8b4513] uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  ),
});

export default function RetroVintageShowcase() {
  return <ShowcaseContent />;
}

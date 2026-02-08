import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#2d6a4f] text-xl">Loading...</p>
      </div>
    </div>
  ),
});

export default function SolarpunkShowcase() {
  return <ShowcaseContent />;
}

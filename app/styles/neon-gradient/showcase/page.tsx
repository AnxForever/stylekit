import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#0f0a1e] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-purple-500 border-t-transparent animate-spin rounded-full mb-4" />
        <p className="text-purple-400 font-medium">Loading...</p>
      </div>
    </div>
  ),
});

export default function NeonGradientShowcase() {
  return <ShowcaseContent />;
}

import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 text-xl">Loading...</p>
      </div>
    </div>
  ),
});

export default function ModernGradientShowcase() {
  return <ShowcaseContent />;
}

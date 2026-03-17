import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#1c1c1e] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-transparent animate-spin rounded-full mb-4" />
        <p className="text-white/40 text-sm">Loading...</p>
      </div>
    </div>
  ),
});

export default function MacosVibrancyShowcase() {
  return <ShowcaseContent />;
}

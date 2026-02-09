import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#d4a088] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent animate-spin rounded-full mb-4" />
        <p className="text-white/80 font-medium">Loading...</p>
      </div>
    </div>
  ),
});

export default function WarmDashboardShowcase() {
  return <ShowcaseContent />;
}

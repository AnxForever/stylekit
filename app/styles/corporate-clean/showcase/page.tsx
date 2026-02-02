import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-semibold text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  ),
});

export default function CorporateCleanShowcase() {
  return <ShowcaseContent />;
}

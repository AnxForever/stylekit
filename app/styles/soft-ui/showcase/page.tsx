import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-medium text-lg text-slate-600">Loading...</p>
      </div>
    </div>
  ),
});

export default function SoftUIShowcase() {
  return <ShowcaseContent />;
}

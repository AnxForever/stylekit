import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent animate-spin mb-4 rounded-full" />
        <p className="font-medium text-xl text-slate-100">Loading...</p>
      </div>
    </div>
  ),
});

export default function DarkModeShowcase() {
  return <ShowcaseContent />;
}

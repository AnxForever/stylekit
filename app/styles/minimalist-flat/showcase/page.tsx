import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent animate-spin mb-4" />
        <p className="font-medium text-lg">Loading...</p>
      </div>
    </div>
  ),
});

export default function MinimalistFlatShowcase() {
  return <ShowcaseContent />;
}

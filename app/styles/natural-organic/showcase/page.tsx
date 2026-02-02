import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#faf6f1] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-stone-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-stone-600 text-xl">Loading...</p>
      </div>
    </div>
  ),
});

export default function NaturalOrganicShowcase() {
  return <ShowcaseContent />;
}

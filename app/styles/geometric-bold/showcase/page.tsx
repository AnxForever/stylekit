import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-16 h-16 bg-black animate-spin mb-4" />
        <p className="font-black text-xl uppercase tracking-widest">LOADING</p>
      </div>
    </div>
  ),
});

export default function GeometricBoldShowcase() {
  return <ShowcaseContent />;
}

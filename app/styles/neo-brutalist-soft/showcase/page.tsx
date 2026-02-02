import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-10 h-10 border-2 border-gray-800 border-t-transparent animate-spin mb-4" />
        <p className="font-bold text-lg text-gray-800">加载中...</p>
      </div>
    </div>
  ),
});

export default function NeoBrutalistSoftShowcase() {
  return <ShowcaseContent />;
}

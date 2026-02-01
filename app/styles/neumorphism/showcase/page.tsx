import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 rounded-full shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] animate-pulse mb-4" />
        <p className="font-semibold text-gray-600">加载中...</p>
      </div>
    </div>
  ),
});

export default function NeumorphismShowcase() {
  return <ShowcaseContent />;
}

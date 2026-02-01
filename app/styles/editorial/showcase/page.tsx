import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border border-[#0a0a0a] border-t-transparent animate-spin mb-4" />
        <p className="font-serif text-lg text-[#6b7280]">加载中...</p>
      </div>
    </div>
  ),
});

export default function EditorialShowcase() {
  return <ShowcaseContent />;
}

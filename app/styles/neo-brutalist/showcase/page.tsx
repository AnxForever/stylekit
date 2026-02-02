import dynamic from "next/dynamic";

// 懒加载 Showcase 内容，减少首屏 JS 体积
const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-black border-t-transparent animate-spin mb-4" />
        <p className="font-black text-xl">加载中...</p>
      </div>
    </div>
  ),
});

export default function NeoBrutalistShowcase() {
  return <ShowcaseContent />;
}

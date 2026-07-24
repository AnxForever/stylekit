import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-black transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="relative p-6 bg-white border-4 border-black">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-blue-600" />
        <h3 className="text-xl font-bold text-black uppercase tracking-wider mb-2">包豪斯卡片</h3>
        <p className="text-gray-700">形式追随功能</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border-4 border-black text-black font-medium placeholder-gray-400 focus:border-red-600 focus:outline-none transition-colors"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-3 relative overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute top-3 right-3 w-12 h-12 bg-yellow-400 rounded-full" />
        <div className="absolute bottom-4 right-6 w-8 h-8 bg-blue-600" />
        <div className="absolute top-8 right-10 w-0 h-0 border-l-[16px] border-l-transparent border-b-[28px] border-b-red-600 border-r-[16px] border-r-transparent" />
        <div className="relative w-full max-w-[180px]">
          <div className="relative bg-white border-4 border-black p-4">
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-600" />
            <div className="font-black text-lg text-black uppercase tracking-wider mb-1">BAU<br/>HAUS</div>
            <p className="text-gray-600 text-[10px] mb-3">功能主义</p>
            <button className="w-full py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
              Explore
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

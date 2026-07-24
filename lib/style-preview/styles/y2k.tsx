import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-full text-white font-bold shadow-[0_4px_15px_rgba(255,105,180,0.4)] hover:shadow-[0_6px_20px_rgba(255,105,180,0.6)] hover:scale-105 transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-white/60 to-pink-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">Y2K 卡片</h3>
        <p className="text-gray-600">千禧年未来主义</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-[0_0_20px_rgba(255,105,180,0.3)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-pink-100 via-white to-cyan-100 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Bubbles */}
        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gradient-to-br from-pink-200/50 to-transparent blur-sm" />
        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-200/50 to-transparent blur-sm" />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-gradient-to-br from-white/70 to-pink-100/50 backdrop-blur-md rounded-3xl border border-white/60 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 font-bold text-sm mb-2">Y2K</div>
            <p className="text-gray-500 text-[10px] mb-3">千禧年美学</p>
            <button className="w-full py-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full text-white text-xs font-bold shadow-[0_4px_15px_rgba(255,105,180,0.3)]">
              Enter
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

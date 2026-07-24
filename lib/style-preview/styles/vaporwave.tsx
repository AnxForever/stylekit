import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,113,206,0.5)] hover:shadow-[0_0_30px_rgba(255,113,206,0.7)] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-purple-900/80 to-pink-900/80 border border-pink-500/30 shadow-[0_0_30px_rgba(255,113,206,0.3)]">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">蒸汽波卡片</h3>
        <p className="text-pink-200/70">复古未来主义美学</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-purple-900/50 border border-pink-500/30 text-pink-100 placeholder-pink-400/50 focus:outline-none focus:border-pink-500 focus:shadow-[0_0_15px_rgba(255,113,206,0.3)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,113,206,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,113,206,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-purple-900/60 backdrop-blur-sm border border-pink-500/30 p-4 shadow-[0_0_20px_rgba(255,113,206,0.3)]">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-bold text-sm mb-2">VAPORWAVE</div>
            <p className="text-pink-300/60 text-[10px] mb-3">アエステティック</p>
            <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold uppercase shadow-[0_0_15px_rgba(255,113,206,0.5)]">
              Enter
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

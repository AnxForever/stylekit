import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-transparent border-2 border-pink-500 text-pink-500 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,255,0.5),inset_0_0_10px_rgba(255,0,255,0.1)] hover:bg-pink-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,255,0.8)] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-b from-purple-900/80 to-black/80 border border-pink-500/50 shadow-[0_0_20px_rgba(255,0,255,0.2)]">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-2">合成波卡片</h3>
        <p className="text-pink-200/70">复古未来主义</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-black/50 border-2 border-cyan-500/50 text-cyan-100 placeholder-cyan-500/50 shadow-[0_0_10px_rgba(0,255,255,0.1)] focus:border-pink-500 focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-b from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Sun */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-gradient-to-t from-orange-500 via-pink-500 to-purple-500 rounded-t-full opacity-60" />
        {/* Grid floor */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[linear-gradient(transparent_0%,rgba(255,0,255,0.1)_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,255,0.3)_1px,transparent_1px)] bg-[size:15px_8px] [transform:perspective(100px)_rotateX(60deg)] origin-bottom" />
        </div>
        <div className="relative w-full max-w-[180px] z-10">
          <div className="bg-gradient-to-b from-purple-900/80 to-black/80 backdrop-blur-sm border border-pink-500/30 p-4 shadow-[0_0_20px_rgba(255,0,255,0.3)]">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-bold text-sm mb-2">SYNTHWAVE</div>
            <p className="text-pink-300/60 text-[10px] mb-3">Ride into sunset</p>
            <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold uppercase shadow-[0_0_15px_rgba(255,0,255,0.5)]">
              Drive
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

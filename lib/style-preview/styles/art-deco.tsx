import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-8 py-3 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.2em] border-2 border-yellow-400 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="relative p-6 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500" />
        <h3 className="text-xl font-serif text-yellow-500 text-center mb-2 tracking-wider">装饰艺术</h3>
        <p className="text-gray-400 text-center text-sm">奢华典雅的设计</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-slate-900 border border-yellow-600/50 text-yellow-100 placeholder-yellow-600/50 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Radial lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left"
                style={{ transform: `rotate(${i * 45}deg)` }}
              />
            ))}
          </div>
        </div>
        <div className="relative w-full max-w-[180px]">
          <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50 p-4">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500" />
            <div className="font-serif text-yellow-500 text-sm text-center mb-1 tracking-wider">ART DECO</div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-2" />
            <p className="text-gray-400 text-[10px] text-center mb-3">黄金时代</p>
            <button className="w-full py-2 border border-yellow-500 text-yellow-500 text-xs font-serif uppercase tracking-wider hover:bg-yellow-500 hover:text-black transition-all">
              Enter
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

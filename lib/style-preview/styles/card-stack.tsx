import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      // Glassmorphism 风格 - 毛玻璃效果
      <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* 背景光晕 */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-violet-500/30 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl" />
        <div className="relative w-32 h-24">
          {/* Back card */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transform translate-y-4 scale-90 opacity-50" />
          {/* Middle card */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 transform translate-y-2 scale-95 opacity-75" />
          {/* Front card */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/80 to-purple-600/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-xs font-bold">STACK</div>
              <div className="text-[10px] text-white/70">Glass Effect</div>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

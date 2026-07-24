import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      // Cyberpunk Neon 风格 - 霓虹发光
      <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }} />
        {/* 霓虹光晕 */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#00ffff]/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-[#ff00ff]/20 rounded-full blur-xl" />
        <div className="relative z-10 text-center px-4">
          <div className="text-[#00ffff]/60 text-[8px] uppercase tracking-wider mb-1">Fullscreen</div>
          <div className="text-white font-bold text-sm mb-1" style={{textShadow: '0 0 10px rgba(0,255,255,0.5)'}}>Hero Layout</div>
          <div className="text-[#00ffff]/70 text-[10px]">Neon glow effect</div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#00ffff]/50">
          <div className="text-[8px]">Scroll</div>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

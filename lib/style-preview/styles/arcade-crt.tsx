import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#050505] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#39ff14]/60 bg-black p-4 shadow-[0_0_20px_rgba(57,255,20,0.25)]">
          <div className="text-[#39ff14] text-xs font-mono tracking-widest mb-2">ARCADE CRT</div>
          <div className="h-px bg-[#39ff14]/40 mb-3" />
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <div className="h-6 bg-[#ff00ff]/25 border border-[#ff00ff]/60" />
            <div className="h-6 bg-[#00ffff]/25 border border-[#00ffff]/60" />
            <div className="h-6 bg-[#ffff00]/25 border border-[#ffff00]/60" />
          </div>
          <p className="text-[10px] text-[#39ff14]/70 font-mono">NEON // SCANLINES // RETRO</p>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

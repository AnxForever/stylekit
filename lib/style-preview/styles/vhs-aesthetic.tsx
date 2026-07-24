import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#12011f] flex items-center justify-center p-4">
        <div className="w-full max-w-[210px] border border-[#ff00ff]/55 bg-[#1a0a2e] p-4 shadow-[0_0_20px_rgba(255,0,255,0.25)]">
          <div className="text-[#00ffff] text-xs font-mono tracking-widest mb-2">VHS AESTHETIC</div>
          <div className="h-px bg-gradient-to-r from-[#ff00ff]/20 via-[#00ffff]/40 to-[#ff00ff]/20 mb-3" />
          <div className="space-y-1.5 mb-3">
            <div className="h-1 bg-[#ff00ff]/45" />
            <div className="h-1 bg-[#00ffff]/35" />
            <div className="h-1 bg-[#ffff00]/30" />
          </div>
          <p className="text-[10px] text-[#00ffff]/70 font-mono">TRACKING // NOISE // RETRO TAPE</p>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

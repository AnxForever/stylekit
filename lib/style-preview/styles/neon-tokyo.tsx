import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a1a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#ff1493]/40 bg-[#0f0f2a] p-4 shadow-[0_0_20px_rgba(255,20,147,0.2)]">
          <div className="text-[#ff1493] text-xs font-mono tracking-widest mb-2">NEON TOKYO</div>
          <div className="h-px bg-gradient-to-r from-[#ff1493] to-[#00ffff] mb-3" />
          <p className="text-[#00ffff]/60 text-xs font-mono mb-3">Cyberpunk streets</p>
          <button className="border border-[#00ffff]/50 text-[#00ffff] text-xs font-mono px-3 py-1">ENTER</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

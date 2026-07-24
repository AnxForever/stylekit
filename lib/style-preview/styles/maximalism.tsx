import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#1a0a2e] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-[#ffd700] bg-gradient-to-br from-[#d4145a]/20 to-[#1a0a2e] p-4 rounded-xl shadow-[0_0_20px_rgba(212,20,90,0.3)]">
          <div className="text-[#ffd700] text-sm font-black mb-2">MAXIMALISM</div>
          <p className="text-white/60 text-xs mb-3">More is more</p>
          <button className="bg-[#d4145a] text-white text-xs font-bold px-3 py-1.5 rounded-lg">Go Bold</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

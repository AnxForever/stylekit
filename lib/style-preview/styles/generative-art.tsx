import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#0b0b12] flex items-center justify-center p-4">
        <div className="w-full max-w-[210px] border border-[#7c3aed]/50 bg-[#131321] p-4">
          <div className="text-[#a78bfa] text-xs font-mono tracking-widest mb-3">GENERATIVE ART</div>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-5 bg-gradient-to-br from-[#7c3aed] to-[#22d3ee] opacity-80" style={{ transform: `scale(${0.85 + i * 0.02})` }} />
            ))}
          </div>
          <p className="text-[10px] text-[#a78bfa]/70 font-mono">ALGORITHMIC PATTERNS</p>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

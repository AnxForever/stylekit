import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f8f6f3] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#c9a96e]/30 bg-white p-4">
          <div className="text-[#1a1a1a] text-sm font-serif tracking-wide mb-2">Marble Luxury</div>
          <div className="h-px bg-[#c9a96e] mb-3" />
          <p className="text-[#1a1a1a]/50 text-xs font-serif mb-3">Refined elegance</p>
          <button className="border border-[#c9a96e] text-[#1a1a1a] text-xs px-4 py-1 font-serif">Discover</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

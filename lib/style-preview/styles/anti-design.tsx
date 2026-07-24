import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#ffef00] flex items-center justify-center p-4">
        <div className="w-full max-w-[210px] border-4 border-black bg-white p-3 rotate-[-2deg] shadow-[6px_6px_0_0_#000]">
          <div className="text-black text-base font-black uppercase tracking-tight leading-none mb-2">ANTI DESIGN</div>
          <p className="text-[11px] text-black font-bold mb-3">RAW. LOUD. UNPOLISHED.</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-7 bg-[#ff3b30] border-2 border-black" />
            <div className="h-7 bg-[#0057ff] border-2 border-black" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

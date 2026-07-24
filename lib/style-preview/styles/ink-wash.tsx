import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f8f5f0] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-b border-[#2c2c2c]/20 bg-[#f8f5f0] p-4">
          <div className="text-[#2c2c2c] text-sm font-light tracking-[0.2em] mb-2">Ink Wash</div>
          <div className="h-px bg-[#2c2c2c]/15 mb-3" />
          <p className="text-[#a89279] text-xs font-light tracking-wide mb-3">Calligraphic fluidity</p>
          <div className="w-8 h-0.5 bg-[#2c2c2c]/30" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

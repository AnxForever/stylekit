import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#faf5ef] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-[#2d4a2d]/30 bg-white p-4 rounded">
          <div className="text-[#2d4a2d] text-sm font-serif mb-2">Victorian Botanical</div>
          <div className="h-px bg-[#8b6914]/30 mb-3" />
          <p className="text-[#2d4a2d]/60 text-xs font-serif mb-3">Ornate natural beauty</p>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-[#2d4a2d]/20" />
            <div className="w-3 h-3 rounded-full bg-[#8b6914]/20" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

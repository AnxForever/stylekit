import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      // Natural Organic 风格 - 大地色调
      <div className="w-full h-full bg-[#faf6f1] flex items-center justify-center p-3">
        <div className="w-full max-w-[220px] columns-3 gap-1.5">
          <div className="break-inside-avoid mb-1.5 h-16 bg-gradient-to-br from-[#606c38] to-[#8b9d77] rounded-2xl" />
          <div className="break-inside-avoid mb-1.5 h-10 bg-gradient-to-br from-[#d4a373] to-[#bc6c25] rounded-2xl" />
          <div className="break-inside-avoid mb-1.5 h-20 bg-gradient-to-br from-[#5c4033] to-[#8b7355] rounded-2xl" />
          <div className="break-inside-avoid mb-1.5 h-12 bg-[#8b9d77]/30 rounded-2xl border border-[#8b9d77]/40" />
          <div className="break-inside-avoid mb-1.5 h-8 bg-gradient-to-br from-[#8b9d77] to-[#a3b18a] rounded-2xl" />
          <div className="break-inside-avoid mb-1.5 h-14 bg-gradient-to-br from-[#bc6c25] to-[#d4a373] rounded-2xl" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f3ee] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#c4bba8]/40 bg-[#f5f3ee] p-4 rounded-sm">
          <div className="text-[#4a5548] text-sm tracking-wide mb-2">Zen Garden</div>
          <div className="h-px bg-[#c4bba8]/40 mb-3" />
          <p className="text-[#7a7062] text-xs mb-3">Peaceful stone garden</p>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4a5548]/20" />
            <div className="w-3 h-3 rounded-full bg-[#c4bba8]/30" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

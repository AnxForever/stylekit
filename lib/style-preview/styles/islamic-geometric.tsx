import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#1a3a5c] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#c9a74e]/50 bg-[#f5ecd7] p-4">
          <div className="text-[#1a3a5c] text-sm font-serif mb-2">Islamic Geometric</div>
          <div className="h-px bg-[#c9a74e] mb-3" />
          <p className="text-[#1a3a5c]/70 text-xs mb-3">Sacred geometry patterns</p>
          <div className="flex gap-1">
            <div className="w-4 h-4 border border-[#c9a74e] rotate-45" />
            <div className="w-4 h-4 border border-[#1a3a5c] rotate-45" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

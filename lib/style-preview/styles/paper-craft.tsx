import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#fdf6ee] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-dashed border-[#e85d75]/40 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(232,93,117,0.15)]">
          <div className="text-[#e85d75] text-sm font-medium mb-2">Paper Craft</div>
          <p className="text-[#e85d75]/50 text-xs mb-3">Cut and fold aesthetics</p>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-[#e85d75]/15 border border-dashed border-[#e85d75]/30" />
            <div className="w-4 h-4 rounded bg-[#f4a261]/15 border border-dashed border-[#f4a261]/30" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

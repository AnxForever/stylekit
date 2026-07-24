import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#fafafa] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#e5e5e5] bg-white p-4">
          <div className="text-[#111111] text-sm font-medium mb-2">Monochrome</div>
          <div className="h-px bg-[#e5e5e5] mb-3" />
          <p className="text-[#666666] text-xs mb-3">Pure black and white</p>
          <button className="bg-[#111111] text-[#fafafa] text-xs px-3 py-1">View</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

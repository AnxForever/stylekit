import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#e8dcc8] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] bg-white border border-[#5c4033]/20 p-4 -skew-x-2">
          <div className="text-[#5c4033] text-sm font-bold skew-x-2 mb-2">Cubism</div>
          <p className="text-[#5c4033]/60 text-xs skew-x-2 mb-3">Fragmented perspectives</p>
          <div className="flex gap-1 skew-x-2">
            <div className="w-4 h-4 bg-[#5c4033]/20 rotate-12" />
            <div className="w-4 h-4 bg-[#b85c38]/30 -rotate-6" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

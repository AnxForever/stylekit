import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#fef9f0] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] bg-white rounded-2xl p-4 shadow-sm border border-[#2d5016]/10">
          <div className="flex gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#e8722a]/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#e8722a]" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#2d5016]/10 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#2d5016]" />
            </div>
          </div>
          <div className="h-2 w-20 rounded bg-[#2d5016] mb-2" />
          <div className="h-1.5 w-28 rounded bg-[#2d5016]/20 mb-3" />
          <div className="h-7 rounded-full bg-[#e8722a] flex items-center justify-center">
            <div className="h-1.5 w-14 rounded bg-white/80" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

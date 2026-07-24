import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f7f7f8] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="h-2 w-16 rounded bg-[#008060] mb-3" />
          <div className="h-1.5 w-28 rounded bg-gray-300 mb-2" />
          <div className="h-1.5 w-20 rounded bg-gray-200 mb-3" />
          <div className="flex gap-2">
            <div className="h-7 flex-1 rounded-lg bg-[#008060] flex items-center justify-center">
              <div className="h-1.5 w-10 rounded bg-white/80" />
            </div>
            <div className="h-7 flex-1 rounded-lg border border-gray-300 flex items-center justify-center">
              <div className="h-1.5 w-8 rounded bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

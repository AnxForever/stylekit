import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
            <div className="h-1.5 w-12 rounded bg-gray-400" />
            <div className="ml-auto h-1.5 w-6 rounded bg-[#22c55e]" />
          </div>
          <div className="space-y-1 mb-2">
            <div className="flex gap-1">
              <div className="h-3 flex-1 rounded bg-[#3b82f6]/15 border border-[#3b82f6]/20" />
              <div className="h-3 flex-1 rounded bg-[#ef4444]/15 border border-[#ef4444]/20" />
              <div className="h-3 flex-1 rounded bg-[#22c55e]/15 border border-[#22c55e]/20" />
            </div>
            <div className="flex gap-1">
              <div className="h-3 flex-1 rounded bg-gray-100" />
              <div className="h-3 flex-1 rounded bg-gray-100" />
              <div className="h-3 flex-1 rounded bg-gray-100" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

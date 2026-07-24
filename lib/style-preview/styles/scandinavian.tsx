import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0eb] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[#c9a88c]/20" />
        <div className="relative w-full max-w-[200px]">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-[#3d3d3d]/10">
            <div className="w-full h-2 bg-[#5a7a6b] rounded mb-3" />
            <div className="font-light text-sm text-[#3d3d3d] mb-2">Scandinavian</div>
            <p className="text-xs text-[#3d3d3d]/50 mb-3">Warm Minimalism</p>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-[#5a7a6b]" />
              <div className="w-6 h-6 rounded-full bg-[#7ba0b8]" />
              <div className="w-6 h-6 rounded-full bg-[#c9a88c]" />
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] bg-white border border-[#e8572a]/20 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#e8572a]" />
            <div className="w-3 h-3 rounded-full bg-[#2b7a78]" />
          </div>
          <div className="text-[#333] text-sm font-medium mb-1">Mid-Century</div>
          <p className="text-gray-500 text-xs mb-3">Retro geometric elegance</p>
          <div className="h-1 bg-[#e8572a] rounded-full w-16" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#faf5ef] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#b5654a]/30 bg-white rounded-xl p-4 shadow-sm">
          <div className="text-[#b5654a] text-sm font-medium mb-2">Terracotta</div>
          <p className="text-[#b5654a]/60 text-xs mb-3">Warm earthy tones</p>
          <button className="bg-[#b5654a] text-white text-xs px-4 py-1.5 rounded-lg">Explore</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

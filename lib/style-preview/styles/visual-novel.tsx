import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#6366f1] text-white font-medium rounded-lg hover:bg-[#ec4899] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f7fafc] border border-[#6366f1]/30 rounded-lg">
        <h3 className="text-xl text-[#4a5568] mb-2">Visual Novel Card</h3>
        <p className="text-sm text-[#6366f1]">Choose your path</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Enter choice..." className="w-full px-4 py-3 bg-[#f7fafc] border border-[#6366f1]/30 rounded-lg text-[#4a5568] placeholder-[#4a5568]/40 focus:outline-none focus:border-[#6366f1] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f7fafc] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#6366f1]/30 rounded-lg p-4 bg-[#f7fafc]">
          <div className="text-base text-[#4a5568] mb-2">Visual Novel</div>
          <p className="text-xs text-[#6366f1] mb-3">Story unfolds</p>
          <button className="bg-[#6366f1] text-white text-xs px-4 py-2 rounded-lg">Choose</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

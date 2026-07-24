import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#d4a0a0] text-white font-medium rounded-full hover:bg-[#87ceeb] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#faf8f5] border border-[#d4a0a0]/30 rounded-2xl">
        <h3 className="text-xl text-[#d4a0a0] mb-2">Watercolor Card</h3>
        <p className="text-sm text-[#d4a0a0]/60">Soft washes of color</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Paint here..." className="w-full px-4 py-3 bg-[#faf8f5] border border-[#d4a0a0]/30 rounded-full text-[#d4a0a0] placeholder-[#d4a0a0]/40 focus:outline-none focus:border-[#87ceeb] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#faf8f5] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#d4a0a0]/30 rounded-2xl p-4 bg-[#faf8f5]">
          <div className="text-base text-[#d4a0a0] mb-2">Watercolor</div>
          <p className="text-xs text-[#d4a0a0]/60 mb-3">Soft art</p>
          <button className="bg-[#d4a0a0] text-white text-xs px-4 py-2 rounded-full">Paint</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

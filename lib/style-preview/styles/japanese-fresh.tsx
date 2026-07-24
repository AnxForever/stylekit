import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#64b5f6] text-white font-light tracking-wide rounded-full hover:bg-[#98d8c8] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#fafaf8] border border-[#64b5f6]/20 rounded-2xl">
        <h3 className="text-xl text-[#64b5f6] font-light mb-2">Fresh Card</h3>
        <p className="text-sm text-[#98d8c8]">Light and airy</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Type gently..." className="w-full px-4 py-3 bg-[#fafaf8] border border-[#64b5f6]/20 rounded-full text-[#64b5f6] placeholder-[#64b5f6]/30 focus:outline-none focus:border-[#98d8c8] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#fafaf8] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#64b5f6]/20 rounded-2xl p-4 bg-[#fafaf8]">
          <div className="text-base text-[#64b5f6] font-light mb-2">Fresh</div>
          <p className="text-xs text-[#98d8c8] mb-3">Calm breeze</p>
          <button className="bg-[#64b5f6] text-white text-xs px-4 py-2 rounded-full font-light">Explore</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <div className="p-6 bg-[#F5F0E6] rounded-xl">
        <button className="group inline-flex items-center gap-2 font-serif text-lg text-[#1A1712] hover:text-[#B3401F] transition-colors duration-300">
          Read the chapter
          <span className="inline-block w-8 h-px bg-[#B3401F]" />
        </button>
      </div>
    ),
    card: () => (
      <div className="p-6 bg-[#F5F0E6] rounded-xl">
        <div className="border-t border-[#1A1712]/20 pt-4">
          <span className="font-serif text-3xl text-[#B3401F] leading-none">03</span>
          <h3 className="font-serif text-xl text-[#1A1712] mt-2 mb-1.5">The Register Shift</h3>
          <p className="text-sm text-[#1A1712]/70 leading-relaxed">前景与背景错位滑动，页面有了纸的厚度。</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="p-6 bg-[#F5F0E6] rounded-xl">
        <input
          type="email"
          placeholder="reader@paper.press"
          className="w-full bg-transparent py-2.5 text-lg text-[#1A1712] placeholder-[#1A1712]/30 border-b border-[#1A1712]/25 rounded-none focus:outline-none focus:border-[#B3401F] transition-colors"
        />
      </div>
    ),
    coverPreview: () => (
      <div className="relative w-full h-full bg-[#F5F0E6] overflow-hidden p-5 flex flex-col justify-between">
        <span className="pointer-events-none absolute -top-2 right-2 font-serif text-[7rem] leading-none text-[#1A1712]/[0.06] select-none">1892</span>
        <div className="pointer-events-none absolute right-6 top-6 bottom-6 w-px bg-[#B3401F]/40" />
        <div className="relative">
          <p className="font-serif italic text-[#B3401F] text-sm mb-1">Issue 001</p>
          <h3 className="font-serif text-3xl text-[#1A1712] leading-[0.95]">Depth on<br />Paper</h3>
        </div>
        <div className="relative">
          <p className="font-serif text-2xl text-[#B3401F] float-left mr-2 leading-[0.7]">W</p>
          <p className="text-[11px] text-[#1A1712]/70 leading-relaxed">
            hen foreground and background slide out of register, the flat page finally gains the thickness of paper.
          </p>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

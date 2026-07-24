import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-5 py-2 bg-[#FFFFFF] font-serif text-sm text-[#2A7AE2] border border-[#E5E7EB] rounded-none hover:bg-[#F3F4F6] hover:underline underline-offset-4 transition-colors duration-200">
        Read the paper
      </button>
    ),
    card: () => (
      <div className="bg-[#FFFFFF] border-t border-b border-[#E5E7EB] px-6 py-5 font-serif">
        <p className="text-[15px] leading-[1.75] text-[#1F2933]">
          Attractive quality and must-be quality are not opposite ends of one scale
          <sup className="text-[#2A7AE2] text-xs">[1]</sup>.
        </p>
        <p className="text-xs text-[#6B7280] mt-3">
          [1] Kano, N. (1984). <span className="italic">Journal of the Japanese Society for Quality Control.</span>
        </p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Search citations…"
        className="w-full px-3 py-2 bg-[#FFFFFF] font-serif text-sm text-[#1F2933] placeholder:text-[#6B7280] placeholder:italic border-0 border-b border-[#E5E7EB] rounded-none focus:outline-none focus:border-[#2A7AE2] transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#FFFFFF] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] font-serif">
          <div className="h-1.5 w-28 bg-[#1F2933] mb-1.5" />
          <div className="flex gap-2 items-center mb-2 pb-1.5 border-b border-[#E5E7EB]">
            <div className="h-0.5 w-10 bg-[#6B7280]/60" />
            <div className="h-0.5 w-8 bg-[#6B7280]/60" />
            <div className="h-0.5 w-6 bg-[#2A7AE2]/60" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <div className="h-0.5 w-full bg-[#D1D5DB]" />
              <div className="h-0.5 w-full bg-[#D1D5DB]" />
              <div className="h-0.5 w-3/4 bg-[#D1D5DB]" />
            </div>
            <div className="w-8 space-y-0.5 pt-0.5">
              <div className="h-0.5 w-full bg-[#F3F4F6]" />
              <div className="h-0.5 w-2/3 bg-[#F3F4F6]" />
            </div>
          </div>
          <div className="mt-2 -mx-3 h-10 bg-[#F3F4F6] flex items-end gap-1 px-3 pb-1.5">
            <div className="w-2 h-3 bg-[#2A7AE2]/50" />
            <div className="w-2 h-5 bg-[#2A7AE2]/70" />
            <div className="w-2 h-6 bg-[#E4572E]" />
            <div className="w-2 h-4 bg-[#2A7AE2]/60" />
            <div className="w-2 h-2 bg-[#2A7AE2]/40" />
          </div>
          <p className="text-[7px] text-[#6B7280] mt-1">Figure 1: Measured response by condition.</p>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

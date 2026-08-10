import type { StylePreviewComponents } from "../types";

const preview = {
  button: () => (
    <button className="px-5 py-3 rounded-2xl bg-[#2d5b63] text-white text-sm font-semibold shadow-lg shadow-[#2d5b63]/20 hover:-translate-y-0.5 transition-all">
      Use this style
    </button>
  ),
  card: () => (
    <div className="p-5 rounded-3xl bg-[#e3f1ed] border border-[#2d5b63]/10 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-[0.16em] uppercase text-[#2d5b63]/70">Featured</span>
        <span className="h-2 w-2 rounded-full bg-[#f3c98b]" />
      </div>
      <h3 className="text-lg font-semibold text-[Soft Utility] mb-2">Soft Utility</h3>
      <p className="text-sm leading-relaxed text-[#557077]">A mobile-first card with clear hierarchy and a gentle tactile rhythm.</p>
    </div>
  ),
  input: () => (
    <input
      type="text"
      placeholder="Search styles"
      className="w-full px-4 py-3 rounded-2xl bg-[#f4f8f6] border border-[#2d5b63]/20 text-[Soft Utility] placeholder:text-[#557077]/60 focus:outline-none focus:ring-4 focus:ring-[#f3c98b]/30"
    />
  ),
  coverPreview: () => (
    <div className="w-full h-full bg-[#f4f8f6] p-4 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[220px] rounded-[28px] bg-white/90 border border-[#2d5b63]/10 p-4 shadow-lg shadow-[#2d5b63]/10">
        <div className="flex items-center justify-between mb-4">
          <div className="h-2 w-16 rounded-full bg-[#2d5b63]" />
          <div className="h-7 w-7 rounded-full bg-[#f3c98b]/60" />
        </div>
        <div className="rounded-2xl bg-[#e3f1ed] p-4 mb-3">
          <div className="h-20 rounded-xl bg-[#f3c98b]/60 mb-3" />
          <div className="h-3 w-3/4 rounded-full bg-[Soft Utility]/80 mb-2" />
          <div className="h-2 w-1/2 rounded-full bg-[#557077]/40" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 flex-1 rounded-full bg-[#2d5b63]" />
          <div className="h-7 w-7 rounded-full bg-[#f3c98b]" />
        </div>
      </div>
    </div>
  ),
} satisfies StylePreviewComponents;

export default preview;
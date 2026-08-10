import type { StylePreviewComponents } from "../types";

const preview = {
  button: () => (
    <button className="px-5 py-3 rounded-2xl bg-[#e97b61] text-white text-sm font-semibold shadow-lg shadow-[#e97b61]/20 hover:-translate-y-0.5 transition-all">
      Use this style
    </button>
  ),
  card: () => (
    <div className="p-5 rounded-3xl bg-[#f5eee2] border border-[#e97b61]/10 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-[0.16em] uppercase text-[#e97b61]/70">Featured</span>
        <span className="h-2 w-2 rounded-full bg-[#e9d7a9]" />
      </div>
      <h3 className="text-lg font-semibold text-[Editorial] mb-2">Editorial</h3>
      <p className="text-sm leading-relaxed text-[#665f59]">A mobile-first card with clear hierarchy and a gentle tactile rhythm.</p>
    </div>
  ),
  input: () => (
    <input
      type="text"
      placeholder="Search styles"
      className="w-full px-4 py-3 rounded-2xl bg-[#fffdf8] border border-[#e97b61]/20 text-[Editorial] placeholder:text-[#665f59]/60 focus:outline-none focus:ring-4 focus:ring-[#e9d7a9]/30"
    />
  ),
  coverPreview: () => (
    <div className="w-full h-full bg-[#fffdf8] p-4 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[220px] rounded-[28px] bg-white/90 border border-[#e97b61]/10 p-4 shadow-lg shadow-[#e97b61]/10">
        <div className="flex items-center justify-between mb-4">
          <div className="h-2 w-16 rounded-full bg-[#e97b61]" />
          <div className="h-7 w-7 rounded-full bg-[#e9d7a9]/60" />
        </div>
        <div className="rounded-2xl bg-[#f5eee2] p-4 mb-3">
          <div className="h-20 rounded-xl bg-[#e9d7a9]/60 mb-3" />
          <div className="h-3 w-3/4 rounded-full bg-[Editorial]/80 mb-2" />
          <div className="h-2 w-1/2 rounded-full bg-[#665f59]/40" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 flex-1 rounded-full bg-[#e97b61]" />
          <div className="h-7 w-7 rounded-full bg-[#e9d7a9]" />
        </div>
      </div>
    </div>
  ),
} satisfies StylePreviewComponents;

export default preview;
import type { StylePreviewComponents } from "../types";

const preview = {
  button: () => (
    <button className="px-5 py-3 rounded-2xl bg-[#66508f] text-white text-sm font-semibold shadow-lg shadow-[#66508f]/20 hover:-translate-y-0.5 transition-all">
      Use this style
    </button>
  ),
  card: () => (
    <div className="p-5 rounded-3xl bg-[#cbefdf] border border-[#66508f]/10 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-[0.16em] uppercase text-[#66508f]/70">Featured</span>
        <span className="h-2 w-2 rounded-full bg-[#ffb5a7]" />
      </div>
      <h3 className="text-lg font-semibold text-[Pastel App] mb-2">Pastel App</h3>
      <p className="text-sm leading-relaxed text-[#5b5364]">A mobile-first card with clear hierarchy and a gentle tactile rhythm.</p>
    </div>
  ),
  input: () => (
    <input
      type="text"
      placeholder="Search styles"
      className="w-full px-4 py-3 rounded-2xl bg-[#fff8f0] border border-[#66508f]/20 text-[Pastel App] placeholder:text-[#5b5364]/60 focus:outline-none focus:ring-4 focus:ring-[#ffb5a7]/30"
    />
  ),
  coverPreview: () => (
    <div className="w-full h-full bg-[#fff8f0] p-4 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[220px] rounded-[28px] bg-white/90 border border-[#66508f]/10 p-4 shadow-lg shadow-[#66508f]/10">
        <div className="flex items-center justify-between mb-4">
          <div className="h-2 w-16 rounded-full bg-[#66508f]" />
          <div className="h-7 w-7 rounded-full bg-[#ffb5a7]/60" />
        </div>
        <div className="rounded-2xl bg-[#cbefdf] p-4 mb-3">
          <div className="h-20 rounded-xl bg-[#ffb5a7]/60 mb-3" />
          <div className="h-3 w-3/4 rounded-full bg-[Pastel App]/80 mb-2" />
          <div className="h-2 w-1/2 rounded-full bg-[#5b5364]/40" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 flex-1 rounded-full bg-[#66508f]" />
          <div className="h-7 w-7 rounded-full bg-[#ffb5a7]" />
        </div>
      </div>
    </div>
  ),
} satisfies StylePreviewComponents;

export default preview;
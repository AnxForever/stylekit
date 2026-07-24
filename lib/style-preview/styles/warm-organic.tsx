import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-5 py-2.5 bg-[#C86A4A] text-white text-sm font-sans rounded-lg shadow-[0_2px_8px_rgba(200,106,74,0.25)] hover:bg-[#B85A3A] hover:shadow-[0_4px_14px_rgba(200,106,74,0.35)] transition-all duration-200">
        View Projects
      </button>
    ),
    card: () => (
      <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(45,42,36,0.06)] w-full">
        <div className="aspect-[4/3] bg-[#E8DED1] relative flex items-center justify-center">
          <span className="text-[#D4BFA5] text-3xl">◐</span>
        </div>
        <div className="p-3">
          <p className="text-sm font-serif font-semibold text-[#2D2A24]">Terracotta Vessels</p>
          <p className="text-[10px] text-[#8B7D6B] mt-0.5">Product Design · 2025</p>
        </div>
      </div>
    ),
    input: () => (
      <input
        type="email"
        placeholder="your@email.com"
        className="w-full px-3 py-2.5 bg-[#E8DED1] text-sm text-[#2D2A24] placeholder:text-[#8B7D6B] rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#C86A4A]/40 transition-all duration-200 font-sans"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#F5F0EB] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] relative">
          <div className="h-1.5 w-16 bg-[#2D2A24] mb-2" />
          <div className="h-0.5 w-12 bg-[#C86A4A] mb-3" />
          <div className="grid grid-cols-2 gap-1.5 mb-1.5">
            <div className="aspect-square bg-white rounded-lg shadow-[0_1px_4px_rgba(45,42,36,0.08)]" />
            <div className="aspect-square bg-white rounded-lg shadow-[0_1px_4px_rgba(45,42,36,0.08)]" />
            <div className="aspect-square bg-white rounded-lg shadow-[0_1px_4px_rgba(45,42,36,0.08)]" />
            <div className="aspect-square bg-white rounded-lg shadow-[0_1px_4px_rgba(45,42,36,0.08)]" />
          </div>
          <div className="w-8 h-px bg-[#C86A4A] mx-auto" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

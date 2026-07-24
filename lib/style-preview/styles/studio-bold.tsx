import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-5 py-2.5 bg-[#FF6B6B] text-white text-xs tracking-[0.08em] font-medium rounded-none hover:bg-[#E55A5A] transition-colors duration-200">
        VIEW WORK →
      </button>
    ),
    card: () => (
      <div className="group relative overflow-hidden bg-[#222222] cursor-pointer w-full aspect-[4/3]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 w-6 h-6 bg-[#FF6B6B]" />
        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-1.5 py-0.5 bg-[#FF6B6B] text-[8px] tracking-[0.1em] font-medium text-white mb-1">BRAND</span>
          <p className="text-sm font-bold">BRØD</p>
        </div>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Your email"
        className="w-full px-3 py-2 bg-transparent border border-[#333333] text-sm text-white placeholder:text-[#555555] rounded-none focus:outline-none focus:border-[#FF6B6B] transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="flex items-start gap-1 mb-2">
            <div className="w-1 h-10 bg-[#FF6B6B]" />
            <div className="flex-1 space-y-0.5">
              <div className="h-2 w-20 bg-white/80" />
              <div className="h-2 w-14 bg-white/60" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 mb-1.5">
            <div className="aspect-square bg-[#222222]" />
            <div className="aspect-square bg-[#2A2A2A]" />
            <div className="aspect-square bg-[#2A2A2A]" />
            <div className="aspect-square bg-[#222222]" />
          </div>
          <div className="flex justify-center gap-2 text-[5px] text-[#555555] tracking-[0.1em]">
            ACME • BRANDCO • LAYER
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

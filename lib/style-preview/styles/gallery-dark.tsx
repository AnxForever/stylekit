import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-5 py-2 bg-transparent text-xs text-[#C4956A] tracking-[0.15em] border border-[#2A2A2A] rounded-sm hover:border-[#666666] transition-colors duration-200">
        View Series →
      </button>
    ),
    card: () => (
      <div className="group relative overflow-hidden bg-[#1A1A1A] rounded-sm cursor-pointer w-full aspect-[4/3]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#222] to-[#151515]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3">
            <p className="text-sm text-white font-medium">Edge of the City</p>
            <p className="text-[10px] text-[#C4956A] mt-0.5">35mm · Ilford HP5</p>
          </div>
        </div>
        <div className="absolute top-2 right-2 text-[9px] text-[#C4956A] font-mono">2026</div>
      </div>
    ),
    input: () => (
      <input
        type="email"
        placeholder="your@email.com"
        className="w-full bg-transparent border-b border-[#2A2A2A] px-0 py-2 text-sm text-white placeholder:text-[#555555] focus:outline-none focus:border-[#C4956A] transition-colors duration-200 font-sans font-light"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-[200px] relative">
          <div className="aspect-[4/3] bg-[#1A1A1A] rounded-sm mb-2 flex items-center justify-center">
            <div className="w-16 h-10 bg-gradient-to-br from-[#222] to-[#151515]" />
          </div>
          <div className="flex gap-1.5 mb-1.5">
            <div className="flex-1 aspect-square bg-[#1A1A1A] rounded-sm" />
            <div className="flex-1 aspect-square bg-[#1A1A1A] rounded-sm" />
          </div>
          <div className="h-px bg-[#1A1A1A] mb-1" />
          <p className="text-[6px] text-[#C4956A] font-mono text-right">ƒ/2.8 · 1/125s</p>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

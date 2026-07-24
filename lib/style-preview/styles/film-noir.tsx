import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1a1a1a] text-[#f5f5f0] font-serif border border-[#8b7355]/40 shadow-lg hover:bg-[#2a2a2a] transition-all tracking-wide text-sm">
        Investigate
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#8b7355]/20 shadow-2xl">
        <h3 className="text-[#f5f5f0] text-lg mb-2 font-serif italic">Shadows & Light</h3>
        <p className="text-[#8b7355] text-sm font-serif">A tale of contrast</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Search the archives..."
        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#8b7355]/30 text-[#f5f5f0] font-serif placeholder:text-[#8b7355]/40 focus:outline-none focus:border-[#d4af37]"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#8b7355]/30 shadow-2xl p-4">
            <div className="text-[#f5f5f0] text-sm font-serif italic mb-3">Film Noir</div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#8b7355]/40 to-transparent mb-3" />
            <p className="text-[#8b7355] text-xs font-serif mb-3">Shadows and mystery</p>
            <button className="bg-[#1a1a1a] text-[#d4af37] text-xs font-serif px-3 py-1.5 border border-[#d4af37]/40 tracking-wide">
              Enter
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

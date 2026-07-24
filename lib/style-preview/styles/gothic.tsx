import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#2d1b4e] text-[#c9a227] font-serif tracking-widest border border-[#c9a227] hover:bg-[#8b1a1a] hover:text-[#c9a227] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a0a] border border-[#c9a227]">
        <h3 className="font-serif text-xl text-[#c9a227] mb-2">Gothic Card</h3>
        <p className="text-sm text-[#c9a227]/60">Dark elegance</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Enter text..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a227] text-[#c9a227] placeholder-[#c9a227]/30 focus:outline-none focus:border-[#8b1a1a] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#c9a227] p-4 bg-[#0a0a0a]">
          <div className="font-serif text-base text-[#c9a227] mb-2">Gothic</div>
          <p className="text-xs text-[#c9a227]/50 mb-3">Dark mystery</p>
          <button className="bg-[#2d1b4e] text-[#c9a227] text-xs px-4 py-2 border border-[#c9a227]">Enter</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

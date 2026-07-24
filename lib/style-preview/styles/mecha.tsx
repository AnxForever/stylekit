import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1a2744] text-[#fbbf24] font-bold tracking-widest border-2 border-[#4a5c3a] uppercase hover:bg-[#ef4444] hover:text-white transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#e5e5e5] border-2 border-[#1a2744]">
        <h3 className="font-bold text-xl text-[#1a2744] tracking-wider mb-2">Mecha Card</h3>
        <p className="text-sm text-[#4a5c3a] uppercase tracking-wide">Unit status: active</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="INPUT CMD..." className="w-full px-4 py-3 bg-[#e5e5e5] border-2 border-[#1a2744] text-[#1a2744] font-mono placeholder-[#1a2744]/40 focus:outline-none focus:border-[#fbbf24] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#e5e5e5] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-[#1a2744] p-4 bg-[#e5e5e5]">
          <div className="font-bold text-base text-[#1a2744] tracking-wider mb-2">MECHA</div>
          <p className="text-xs text-[#4a5c3a] uppercase mb-3">System online</p>
          <button className="bg-[#1a2744] text-[#fbbf24] text-xs px-4 py-2 border border-[#4a5c3a] uppercase tracking-wider">Launch</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

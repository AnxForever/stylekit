import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1e1b4b] text-[#fbbf24] font-medium tracking-wide border border-[#818cf8] rounded hover:bg-[#818cf8] hover:text-[#1e1b4b] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0f0e2e] border border-[#818cf8] rounded">
        <h3 className="text-xl text-[#fbbf24] mb-2">Magic Circle Card</h3>
        <p className="text-sm text-[#e2e8f0]/60">Arcane symbols</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Cast spell..." className="w-full px-4 py-3 bg-[#0f0e2e] border border-[#818cf8] rounded text-[#fbbf24] placeholder-[#fbbf24]/40 focus:outline-none focus:border-[#fbbf24] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0f0e2e] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#818cf8] rounded p-4 bg-[#0f0e2e]">
          <div className="text-base text-[#fbbf24] mb-2">Magic Circle</div>
          <p className="text-xs text-[#e2e8f0]/60 mb-3">Rune glow</p>
          <button className="bg-[#1e1b4b] text-[#fbbf24] text-xs px-4 py-2 rounded border border-[#818cf8]">Invoke</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

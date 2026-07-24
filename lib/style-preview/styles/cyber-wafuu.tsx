import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1e3a5f] text-[#c9a227] font-bold tracking-wide border border-[#c41e3a] hover:bg-[#c41e3a] hover:text-white transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a14] border border-[#1e3a5f]">
        <h3 className="font-bold text-xl text-[#c9a227] mb-2">Cyber Wafuu Card</h3>
        <p className="text-sm text-[#38bdf8]">Digital tradition</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Input..." className="w-full px-4 py-3 bg-[#0a0a14] border border-[#1e3a5f] text-[#c9a227] placeholder-[#c9a227]/40 focus:outline-none focus:border-[#c41e3a] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a14] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#1e3a5f] p-4 bg-[#0a0a14]">
          <div className="font-bold text-base text-[#c9a227] mb-2">Cyber Wafuu</div>
          <p className="text-xs text-[#38bdf8] mb-3">Neo-Japanese</p>
          <button className="bg-[#c41e3a] text-white text-xs px-4 py-2 border border-[#c9a227]">Enter</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

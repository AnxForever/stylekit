import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#7c3aed] text-white font-bold tracking-wider border border-[#06d6a0] hover:bg-[#ff006e] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0f0f1a] border border-[#7c3aed]">
        <h3 className="font-bold text-xl text-[#06d6a0] mb-2">Cyber Anime Card</h3>
        <p className="text-sm text-[#38bdf8]">Holographic UI</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Input data..." className="w-full px-4 py-3 bg-[#0f0f1a] border border-[#7c3aed] text-[#06d6a0] placeholder-[#06d6a0]/40 focus:outline-none focus:border-[#ff006e] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0f0f1a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#7c3aed] p-4 bg-[#0f0f1a]">
          <div className="font-bold text-base text-[#06d6a0] mb-2">Cyber Anime</div>
          <p className="text-xs text-[#38bdf8] mb-3">Neon future</p>
          <button className="bg-[#7c3aed] text-white text-xs px-4 py-2 border border-[#06d6a0]">Launch</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

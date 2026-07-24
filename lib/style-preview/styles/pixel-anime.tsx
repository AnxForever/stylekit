import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#4a90d9] text-white font-bold uppercase border-4 border-[#2d1b69] hover:bg-[#ff6b6b] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#2d1b69] border-4 border-[#4a90d9]">
        <h3 className="font-bold text-xl text-[#ffd93d] mb-2">Pixel Anime Card</h3>
        <p className="text-sm text-[#4a90d9]">8-bit adventure</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="TYPE..." className="w-full px-4 py-3 bg-[#2d1b69] border-4 border-[#4a90d9] text-[#ffd93d] font-mono placeholder-[#ffd93d]/40 focus:outline-none focus:border-[#ff6b6b] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#2d1b69] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-4 border-[#4a90d9] p-4 bg-[#2d1b69]">
          <div className="font-bold text-base text-[#ffd93d] uppercase mb-2">Pixel</div>
          <p className="text-xs text-[#4a90d9] mb-3">Retro game</p>
          <button className="bg-[#4a90d9] text-white text-xs px-4 py-2 border-2 border-[#ffd93d] font-bold uppercase">Play</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

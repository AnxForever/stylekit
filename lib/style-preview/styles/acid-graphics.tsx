import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#39ff14] text-[#0a0a0a] font-black tracking-wider uppercase hover:bg-[#e6ff00] hover:text-[#a020f0] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a0a] border-2 border-[#39ff14]">
        <h3 className="font-black text-xl text-[#39ff14] mb-2">Acid Graphics Card</h3>
        <p className="text-sm text-[#e6ff00]">Rave culture aesthetics</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Enter text..." className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#39ff14] text-[#39ff14] placeholder-[#39ff14]/40 focus:outline-none focus:border-[#e6ff00] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-[#39ff14] p-4 bg-[#0a0a0a]">
          <div className="font-black text-base text-[#39ff14] uppercase mb-2">Acid</div>
          <p className="text-xs text-[#e6ff00] mb-3">Fluorescent chaos</p>
          <button className="bg-[#39ff14] text-[#0a0a0a] text-xs px-4 py-2 font-black uppercase">Enter</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

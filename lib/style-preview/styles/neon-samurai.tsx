import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#dc2626] text-white font-bold tracking-widest uppercase border border-[#fbbf24] hover:bg-[#a020f0] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a0a] border border-[#dc2626]">
        <h3 className="font-bold text-xl text-[#dc2626] mb-2">Neon Samurai Card</h3>
        <p className="text-sm text-[#38bdf8]">Blade of light</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Command..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#dc2626] text-[#fbbf24] placeholder-[#fbbf24]/40 focus:outline-none focus:border-[#a020f0] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#dc2626] p-4 bg-[#0a0a0a]">
          <div className="font-bold text-base text-[#dc2626] uppercase tracking-wider mb-2">Samurai</div>
          <p className="text-xs text-[#38bdf8] mb-3">Neon bushido</p>
          <button className="bg-[#dc2626] text-white text-xs px-4 py-2 border border-[#fbbf24] uppercase">Strike</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#00ffff] text-[#0a0a0a] font-bold tracking-widest uppercase hover:bg-[#ff00ff] hover:text-white transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a0a] border border-[#00ffff]">
        <h3 className="font-bold text-xl text-[#00ffff] mb-2">Glitch Card</h3>
        <p className="text-sm text-[#ff00ff]">Data corrupted</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="ERR0R..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#00ffff] text-[#00ffff] font-mono placeholder-[#00ffff]/40 focus:outline-none focus:border-[#ff00ff] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#00ffff] p-4 bg-[#0a0a0a]">
          <div className="font-bold text-base text-[#00ffff] uppercase tracking-wider mb-2">Glitch</div>
          <p className="text-xs text-[#ff00ff] mb-3">Signal lost</p>
          <button className="bg-[#00ffff] text-[#0a0a0a] text-xs px-4 py-2 font-bold uppercase">Hack</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

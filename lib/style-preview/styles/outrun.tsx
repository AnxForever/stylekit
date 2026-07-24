import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ff006e] text-white font-bold tracking-wider border border-[#ff6ec7] rounded hover:bg-[#a020f0] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a0a] border border-[#ff006e] rounded">
        <h3 className="font-bold text-xl text-[#ff006e] mb-2">Outrun Card</h3>
        <p className="text-sm text-[#00d4ff]">Retro futurism</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Type..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#a020f0] rounded text-[#ff006e] placeholder-[#ff006e]/40 focus:outline-none focus:border-[#00d4ff] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#ff006e] rounded p-4 bg-[#0a0a0a]">
          <div className="font-bold text-base text-[#ff006e] mb-2">Outrun</div>
          <p className="text-xs text-[#00d4ff] mb-3">Neon speed</p>
          <button className="bg-[#a020f0] text-white text-xs px-4 py-2 rounded border border-[#ff6ec7]">Go</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

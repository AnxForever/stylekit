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
    // Cover archetype: atmosphere scene. Outrun is a horizon, a sun and a
    // vanishing grid; a bordered card said none of that.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[62%] bg-[linear-gradient(#1a0033,#3d0066_55%,#ff006e)]" />
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 w-20 h-20 rounded-full bg-[linear-gradient(#ffd166,#ff006e)]" />
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 w-20 h-20 overflow-hidden">
          <div className="absolute inset-x-0 top-[52%] h-[3px] bg-[#0a0a0a]/70" />
          <div className="absolute inset-x-0 top-[66%] h-[4px] bg-[#0a0a0a]/70" />
          <div className="absolute inset-x-0 top-[82%] h-[6px] bg-[#0a0a0a]/70" />
        </div>
        <div className="absolute inset-x-0 top-[62%] h-px bg-[#00d4ff] shadow-[0_0_12px_#00d4ff]" />
        <div className="absolute inset-x-0 bottom-0 top-[62%] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#ff006e_1px,transparent_1px),linear-gradient(#a020f0_1px,transparent_1px)] bg-[size:26px_14px] opacity-70 [transform:perspective(90px)_rotateX(64deg)] origin-top" />
        </div>
        <div className="absolute left-4 bottom-3 w-1.5 h-14 bg-[#0a0a0a]" />
        <div className="absolute left-2.5 bottom-[52px] w-5 h-3 rounded-t-full bg-[#0a0a0a]" />
        <div className="absolute right-5 bottom-3 w-1.5 h-10 bg-[#0a0a0a]" />
        <div className="absolute right-3.5 bottom-[46px] w-4 h-2.5 rounded-t-full bg-[#0a0a0a]" />
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

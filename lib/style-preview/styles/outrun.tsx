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
    // Cover archetype: landing hero. The sunset grid is the hero background of a
    // real page - nav, headline, CTA - not a standalone poster.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[68%] bg-[linear-gradient(#1a0033,#3d0066_58%,#ff006e)]" />
        <div className="absolute left-[62%] top-[26%] w-[72px] h-[72px] rounded-full bg-[linear-gradient(#ffd166,#ff006e)] overflow-hidden">
          <div className="absolute inset-x-0 top-[54%] h-[3px] bg-[#0a0a0a]/70" />
          <div className="absolute inset-x-0 top-[70%] h-[4px] bg-[#0a0a0a]/70" />
          <div className="absolute inset-x-0 top-[86%] h-[5px] bg-[#0a0a0a]/70" />
        </div>
        <div className="absolute inset-x-0 top-[68%] h-px bg-[#00d4ff] shadow-[0_0_12px_#00d4ff]" />
        <div className="absolute inset-x-0 bottom-0 top-[68%] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#ff006e_1px,transparent_1px),linear-gradient(#a020f0_1px,transparent_1px)] bg-[size:26px_14px] opacity-70 [transform:perspective(90px)_rotateX(64deg)] origin-top" />
        </div>

        <div className="relative flex items-center justify-between border-b border-[#ff006e]/40 px-4 py-2.5">
          <div className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#00d4ff]">
            NEONDRIVE
          </div>
          <div className="flex gap-3 pr-[68px] font-mono text-[8px] tracking-[0.2em] text-white/70">
            <span>TRACKS</span>
            <span>GARAGE</span>
          </div>
        </div>

        <div className="relative px-4 pt-5">
          <div className="font-mono text-[7px] tracking-[0.4em] text-[#00d4ff]">
            SIDE A · 1986
          </div>
          <div className="mt-1.5 font-mono text-[26px] font-bold leading-[1.05] tracking-tight text-white [text-shadow:2px_0_#ff006e,-2px_0_#00d4ff]">
            NIGHT
            <br />
            DRIVE
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="bg-[#ff006e] px-3 py-1 font-mono text-[8px] font-bold tracking-[0.2em] text-white shadow-[0_0_14px_rgba(255,0,110,0.7)]">
              PLAY
            </div>
            <div className="border border-[#00d4ff] px-3 py-1 font-mono text-[8px] tracking-[0.2em] text-[#00d4ff]">
              TRACKLIST
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

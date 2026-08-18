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
    // Cover archetype: landing hero. Channel separation and scanlines corrupt a
    // real page - nav, headline, CTA, cards - which is where the effect belongs.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative">
        <div className="relative flex items-center justify-between border-b border-[#00ffff]/40 px-4 py-2">
          <div className="relative font-mono text-[11px] font-bold tracking-[0.2em] text-white">
            <span className="absolute -left-[2px] top-0 text-[#ff00ff]/80">NULLWAVE</span>
            <span className="absolute left-[2px] top-0 text-[#00ffff]/80">NULLWAVE</span>
            <span className="relative">NULLWAVE</span>
          </div>
          <div className="flex gap-3 pr-[68px] font-mono text-[8px] tracking-[0.2em] text-white/60">
            <span>DOCS</span>
            <span>DEMO</span>
          </div>
        </div>
        <div className="relative px-4 pt-3">
          <div className="font-mono text-[7px] tracking-[0.36em] text-[#ffff00]">
            ERR 0xE7 · SIGNAL LOST
          </div>
          <div className="relative mt-1 font-mono text-[23px] font-bold leading-[1.05] tracking-tight">
            <span className="absolute left-[-3px] top-0 text-[#ff00ff]/70">BROKEN</span>
            <span className="absolute left-[3px] top-0 text-[#00ffff]/70">BROKEN</span>
            <span className="relative text-white">BROKEN</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="bg-[#00ffff] px-3 py-1 font-mono text-[8px] font-bold uppercase text-[#0a0a0a]">
              Recover
            </div>
            <div className="border border-[#ff00ff] px-3 py-1 font-mono text-[8px] uppercase text-[#ff00ff]">
              Ignore
            </div>
          </div>
        </div>
        <div className="relative mt-3 grid grid-cols-3 gap-2 px-4">
          {[
            { id: "0x1F", state: "CORRUPT", color: "#ff00ff", width: "84%" },
            { id: "0x2A", state: "PARTIAL", color: "#00ffff", width: "56%" },
            { id: "0x3C", state: "LOST", color: "#ffff00", width: "22%" },
          ].map((item) => (
            <div key={item.id} className="border border-white/15 bg-white/[0.04] px-1.5 py-1.5">
              <div className="flex items-center justify-between font-mono text-[7px] text-white/60">
                <span>{item.id}</span>
                <span style={{ color: item.color }}>{item.state}</span>
              </div>
              <div className="mt-1 h-[4px] bg-white/10">
                <div className="h-full" style={{ width: item.width, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:100%_3px]" />
        <div className="absolute left-0 top-[46%] w-full h-3 bg-[#00ffff]/20 mix-blend-screen" />
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

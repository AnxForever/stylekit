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
    // Cover archetype: landing hero. The slash and neon live behind a real page
    // header, headline and CTAs.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_80%_20%,rgba(220,38,38,0.35),transparent_60%)]" />
        <div className="absolute right-[-30px] top-[-20px] h-[340px] w-[3px] rotate-[24deg] bg-[#dc2626] shadow-[0_0_18px_#dc2626]" />
        <div className="absolute right-[6px] top-[-20px] h-[340px] w-[1px] rotate-[24deg] bg-[#38bdf8]/70" />
        <div className="relative flex items-center justify-between border-b border-[#dc2626]/40 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="font-serif text-[13px] tracking-[0.2em] text-[#fbbf24]">刃</div>
            <div className="font-mono text-[10px] tracking-[0.24em] text-white">RONIN</div>
          </div>
          <div className="flex gap-3 pr-[68px] font-mono text-[8px] tracking-[0.2em] text-white/60">
            <span>BLADES</span>
            <span>DOJO</span>
          </div>
        </div>
        <div className="relative px-4 pt-4">
          <div className="font-mono text-[7px] tracking-[0.36em] text-[#38bdf8]">
            NEO-EDO · 2099
          </div>
          <div className="mt-1.5 font-serif text-[26px] leading-[1.06] text-white">
            Cut the
            <br />
            <span className="text-[#dc2626]">signal</span>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="bg-[#dc2626] px-3.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_14px_rgba(220,38,38,0.6)]">
              Enter dojo
            </div>
            <div className="border border-[#fbbf24] px-3 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#fbbf24]">
              Watch
            </div>
          </div>
        </div>
        <div className="absolute left-4 bottom-3 flex gap-2 font-mono text-[7px] tracking-[0.2em] text-white/40">
          <span>01 / KATANA</span>
          <span>02 / WAKIZASHI</span>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

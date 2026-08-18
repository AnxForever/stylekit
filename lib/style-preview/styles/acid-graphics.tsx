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
    // Cover archetype: landing hero. Liquid chrome and acid green as the page
    // background of a real event header.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_75%_15%,rgba(57,255,20,0.35),transparent_60%),radial-gradient(60%_50%_at_20%_85%,rgba(160,32,240,0.45),transparent_65%)]" />
        <div className="absolute right-[36px] top-[74px] w-[104px] h-[104px] rounded-full bg-[conic-gradient(#e6ff00,#39ff14,#ff6ec7,#a020f0,#e6ff00)] blur-[1px] opacity-80" />
        <div className="absolute right-[58px] top-[96px] w-[60px] h-[60px] rounded-full bg-[#0a0a0a]/70 backdrop-blur-[2px]" />
        <div className="relative flex items-center justify-between border-b border-[#39ff14]/40 px-4 py-2">
          <div className="font-mono text-[11px] font-bold tracking-[0.24em] text-[#39ff14]">
            ACID//LAB
          </div>
          <div className="flex gap-3 pr-[68px] font-mono text-[8px] tracking-[0.2em] text-[#e6ff00]/80">
            <span>SETS</span>
            <span>TICKETS</span>
          </div>
        </div>
        <div className="relative px-4 pt-4 max-w-[62%]">
          <div className="font-mono text-[7px] tracking-[0.36em] text-[#ff6ec7]">
            FRI 03:00 · WAREHOUSE 9
          </div>
          <div className="mt-1.5 font-mono text-[25px] font-bold italic leading-[1.02] tracking-tight text-[#e6ff00] [text-shadow:0_0_18px_rgba(57,255,20,0.6)]">
            MELT
            <br />
            DOWN
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="bg-[#39ff14] px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[#0a0a0a]">
              Get pass
            </div>
            <div className="border border-[#ff6ec7] px-3 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#ff6ec7]">
              Lineup
            </div>
          </div>
        </div>
        <div className="absolute left-4 bottom-3 flex gap-3 font-mono text-[7px] tracking-[0.2em] text-white/45">
          <span>01 SLUDGE</span>
          <span>02 CHROME</span>
          <span>03 OOZE</span>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

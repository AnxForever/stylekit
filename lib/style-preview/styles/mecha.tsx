import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1a2744] text-[#fbbf24] font-bold tracking-widest border-2 border-[#4a5c3a] uppercase hover:bg-[#ef4444] hover:text-white transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#e5e5e5] border-2 border-[#1a2744]">
        <h3 className="font-bold text-xl text-[#1a2744] tracking-wider mb-2">Mecha Card</h3>
        <p className="text-sm text-[#4a5c3a] uppercase tracking-wide">Unit status: active</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="INPUT CMD..." className="w-full px-4 py-3 bg-[#e5e5e5] border-2 border-[#1a2744] text-[#1a2744] font-mono placeholder-[#1a2744]/40 focus:outline-none focus:border-[#fbbf24] transition-colors" />
    ),
    // Cover archetype: dashboard. Panel plates, hazard stripes and readouts read
    // as a cockpit console rather than a badge.
    coverPreview: () => (
      <div className="w-full h-full bg-[#e5e5e5] overflow-hidden relative">
        <div className="flex items-center justify-between bg-[#1a2744] px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#fbbf24]" />
            <div className="font-mono text-[10px] font-bold tracking-[0.2em] text-white">
              RX-07
            </div>
          </div>
          <div className="flex gap-2 pr-[68px] font-mono text-[7px] tracking-[0.18em] text-white/60">
            <span>PILOT</span>
            <span>ARMORY</span>
          </div>
        </div>
        <div className="h-2 bg-[repeating-linear-gradient(45deg,#fbbf24_0_8px,#1a2744_8px_16px)]" />
        <div className="grid grid-cols-[1fr_88px] gap-2.5 px-3 pt-2.5">
          <div className="space-y-1.5">
            {[
              ["THRUST", "88%", "#4a5c3a"],
              ["ARMOR", "62%", "#1a2744"],
              ["HEAT", "31%", "#ef4444"],
            ].map(([label, value, color]) => (
              <div key={label} className="border border-[#1a2744]/30 bg-white px-2 py-1">
                <div className="flex justify-between font-mono text-[7px] text-[#1a2744]">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-1 h-[4px] bg-[#1a2744]/10">
                  <div className="h-full" style={{ width: value, backgroundColor: color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="border border-[#1a2744]/30 bg-white p-1.5">
            <div className="h-[46px] bg-[#1a2744]/10 relative">
              <div className="absolute inset-x-1.5 top-2 h-2 bg-[#4a5c3a]" />
              <div className="absolute left-1.5 top-6 bottom-1.5 w-3 bg-[#1a2744]/60" />
              <div className="absolute right-1.5 top-6 bottom-1.5 w-3 bg-[#1a2744]/60" />
            </div>
            <div className="mt-1 font-mono text-[6px] tracking-[0.16em] text-[#1a2744]/70">
              FRAME OK
            </div>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-2 px-3">
          <div className="bg-[#ef4444] px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white">
            Launch
          </div>
          <div className="border-2 border-[#1a2744] px-3 py-[3px] font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#1a2744]">
            Standby
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

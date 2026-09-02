import type { StylePreviewComponents } from "../types";

const SCANLINES = "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.7) 3px)";
const BARS = ["#EDEDED", "#F5E000", "#00E5D8", "#3DFF6E", "#FF2E9A", "#FF2E4C", "#2E6BFF"];

const preview = {
  button: () => (
    <div className="p-4 bg-[#0B0B0E] flex items-center justify-center">
      <button className="px-7 py-3 bg-[#FF2E4C] text-[#0B0B0E] font-mono font-bold uppercase tracking-[0.15em] text-sm rounded-none border-2 border-[#EDEDED]">
        &#9654; Transmit
      </button>
    </div>
  ),
  card: () => (
    <div className="p-4 bg-[#0B0B0E]">
      <div className="relative bg-[#101014] border-2 border-[#EDEDED]/30 rounded-none overflow-hidden">
        <div className="flex h-2">
          <span className="flex-1 bg-[#EDEDED]" /><span className="flex-1 bg-[#F5E000]" />
          <span className="flex-1 bg-[#00E5D8]" /><span className="flex-1 bg-[#FF2E4C]" />
        </div>
        <span className="pointer-events-none absolute inset-0 opacity-30" style={{ background: SCANLINES }} />
        <div className="relative p-5 font-mono">
          <span className="block text-[10px] text-[#00E5D8] mb-2">CH-01 / LIVE</span>
          <h3 className="font-bold uppercase text-lg text-[#EDEDED] tracking-tight mb-1">Signal Lost</h3>
          <p className="text-xs text-[#EDEDED]/60">请稍候 · 信号中断</p>
        </div>
      </div>
    </div>
  ),
  input: () => (
    <div className="p-4 bg-[#0B0B0E]">
      <input
        type="text"
        placeholder="type to transmit_"
        className="w-full bg-[#101014] px-3 py-3 rounded-none font-mono text-[#00E5D8] placeholder-[#EDEDED]/25 border-2 border-[#EDEDED]/30 focus:outline-none focus:border-[#00E5D8]"
      />
    </div>
  ),
  coverPreview: () => (
    <div className="w-full h-full bg-[#0B0B0E] relative overflow-hidden flex flex-col justify-between p-4 font-mono">
      <span className="pointer-events-none absolute inset-0 opacity-30" style={{ background: SCANLINES }} />
      <div className="absolute top-0 right-0 flex h-12 w-24">
        {BARS.map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}
      </div>
      <div className="relative text-[9px] uppercase tracking-[0.25em] text-[#00E5D8]">CH-01 / No Signal</div>
      <div className="relative">
        <div className="text-2xl font-bold uppercase leading-[0.82] text-[#EDEDED]" style={{ textShadow: "2px 0 #00E5D8, -2px 0 #FF2E4C" }}>
          Please<br />Stand By
        </div>
      </div>
      <div className="relative flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF2E4C]" />
        <span className="text-[9px] text-[#FF2E4C] uppercase tracking-wider">Rec</span>
        <span className="ml-auto px-2.5 py-1 bg-[#FF2E4C] text-[#0B0B0E] text-[9px] font-bold uppercase border border-[#EDEDED]">Transmit</span>
      </div>
    </div>
  ),
} satisfies StylePreviewComponents;

export default preview;

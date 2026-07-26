import type { StylePreviewComponents } from "../types";

const preview = {
  button: () => (
    <div className="relative p-6 rounded-xl overflow-hidden bg-black">
      <div className="flex items-center gap-4">
        <button className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#2997FF] text-white font-medium tracking-tight text-sm hover:bg-[#0071E3] transition-all">
          Buy
        </button>
        <a className="inline-flex items-center gap-1 text-[#2997FF] font-medium tracking-tight text-sm">
          Learn more <span aria-hidden>&rsaquo;</span>
        </a>
      </div>
    </div>
  ),
  card: () => (
    <div className="p-4 bg-black rounded-xl">
      <div className="rounded-2xl bg-[#1D1D1F] p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#2997FF] mb-2">Chip</p>
        <h3 className="text-[#F5F5F7] text-lg font-semibold tracking-tight mb-1">A17 performance</h3>
        <p className="text-[#86868B] text-sm leading-relaxed">The fastest ever, and it is only getting started.</p>
      </div>
    </div>
  ),
  input: () => (
    <div className="relative p-6 rounded-xl overflow-hidden bg-black">
      <input
        type="email"
        placeholder="Email for launch updates"
        className="w-full px-5 py-3 rounded-xl bg-[#1D1D1F] border border-white/10 text-[#F5F5F7] placeholder-[#86868B] focus:outline-none focus:border-[#2997FF] transition-colors"
      />
    </div>
  ),
  coverPreview: () => (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* product glow orb, center stage */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(300px circle at 50% 42%, rgba(41,151,255,0.35), transparent 62%)" }} />
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-[28px]" style={{ background: "linear-gradient(150deg, #3a3a3d, #0d0d0f)", boxShadow: "0 0 60px rgba(41,151,255,0.4)" }} />
      {/* spec chips in corners */}
      <div className="absolute top-4 left-4 rounded-xl bg-[#1D1D1F] px-3 py-2">
        <p className="text-[8px] uppercase tracking-[0.2em] text-[#2997FF]">Chip</p>
        <p className="text-[#F5F5F7] text-xs font-semibold">A17</p>
      </div>
      <div className="absolute top-4 right-4 rounded-xl bg-[#1D1D1F] px-3 py-2 text-right">
        <p className="text-[8px] uppercase tracking-[0.2em] text-[#86868B]">Battery</p>
        <p className="text-[#F5F5F7] text-xs font-semibold">29h</p>
      </div>
      {/* headline + CTA */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#2997FF] mb-1">Now revealed</p>
        <h3 className="text-[#F5F5F7] text-xl font-semibold tracking-tight leading-tight mb-3">Vertex Pro</h3>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2997FF] text-white text-[11px] font-medium">Buy</span>
      </div>
    </div>
  ),
} satisfies StylePreviewComponents;

export default preview;

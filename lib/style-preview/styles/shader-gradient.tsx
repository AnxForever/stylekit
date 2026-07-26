import type { StylePreviewComponents } from "../types";

const FIELD =
  "radial-gradient(60% 60% at 28% 32%, rgba(124,92,255,0.55), transparent 68%), radial-gradient(55% 55% at 74% 60%, rgba(34,211,238,0.4), transparent 66%), radial-gradient(52% 60% at 55% 86%, rgba(244,114,182,0.35), transparent 66%), #08090D";

const preview = {
  button: () => (
    <div className="relative p-6 rounded-2xl overflow-hidden" style={{ background: FIELD }}>
      <div className="flex gap-3">
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7C5CFF] text-white font-medium text-sm shadow-[0_8px_30px_rgba(124,92,255,0.35)] hover:bg-[#8f72ff] transition-all">
          Start building
        </button>
        <button className="px-6 py-3 rounded-xl bg-white/8 backdrop-blur-xl border border-white/12 text-white text-sm hover:bg-white/12 transition-all">
          View docs
        </button>
      </div>
    </div>
  ),
  card: () => (
    <div className="p-5 rounded-2xl" style={{ background: FIELD }}>
      <div className="relative rounded-2xl p-5 bg-white/[0.06] backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="w-9 h-9 rounded-lg bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 mb-3" />
        <h3 className="text-white text-base font-semibold mb-1">Realtime by default</h3>
        <p className="text-white/60 text-xs leading-relaxed">Every frame is computed on the GPU. Nothing is baked.</p>
      </div>
    </div>
  ),
  input: () => (
    <div className="relative p-6 rounded-2xl overflow-hidden" style={{ background: FIELD }}>
      <input
        type="email"
        placeholder="you@company.com"
        className="relative w-full px-4 py-3 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/12 text-white placeholder-white/40 focus:outline-none focus:border-[#7C5CFF]/70 transition-all"
      />
    </div>
  ),
  coverPreview: () => (
    <div className="relative w-full h-full overflow-hidden bg-[#08090D]">
      {/* living-gradient mesh mock */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(380px circle at 24% 34%, #7C5CFF, transparent 62%), radial-gradient(340px circle at 76% 58%, #22D3EE, transparent 60%), radial-gradient(300px circle at 52% 88%, #F472B6, transparent 58%)",
        }}
      />
      {/* vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 45%, transparent 28%, rgba(8,9,13,0.72) 100%)" }} />
      {/* glass panel */}
      <div className="absolute left-6 bottom-6 right-6 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/12 p-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#a99bff] mb-1">Realtime WebGL</p>
        <h3 className="text-white text-lg font-semibold leading-tight">The living gradient</h3>
        <div className="mt-3 flex gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#7C5CFF] text-white text-[10px] font-medium">Start building</span>
          <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white/80 text-[10px]">View docs</span>
        </div>
      </div>
    </div>
  ),
} satisfies StylePreviewComponents;

export default preview;

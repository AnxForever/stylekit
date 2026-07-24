import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#6366F1] text-white font-semibold tracking-wide border border-[#6366F1]/50 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all relative overflow-hidden">
        Launch
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0F172A] border border-[#6366F1]/30 relative overflow-hidden">
        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#6366F1]/60" />
        <div className="absolute top-6 right-8 w-1 h-1 rounded-full bg-[#818CF8]/40" />
        <div className="absolute bottom-4 left-6 w-1 h-1 rounded-full bg-[#6366F1]/50" />
        <h3 className="font-semibold text-lg mb-2 text-white/90">Particle Card</h3>
        <p className="text-sm text-[#6366F1]/70">Connected nodes and lines</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Enter data..."
        className="w-full px-4 py-3 bg-[#0F172A] border border-[#6366F1]/30 text-white placeholder-[#6366F1]/30 focus:outline-none focus:border-[#6366F1]/60 focus:shadow-[0_0_12px_rgba(99,102,241,0.2)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute w-2 h-2 rounded-full bg-cyan-400/70 top-8 left-10 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
        <div className="absolute w-2 h-2 rounded-full bg-cyan-300/60 bottom-10 right-12 shadow-[0_0_12px_rgba(34,211,238,0.45)]" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-sky-300/70 top-16 right-16" />
        <div className="absolute h-px w-16 bg-cyan-400/35 top-10 left-12 rotate-12" />
        <div className="w-full max-w-[210px] border border-cyan-500/35 bg-[#0b1222]/90 p-4">
          <div className="text-cyan-300 text-xs font-mono tracking-widest mb-2">PARTICLE FIELD</div>
          <p className="text-cyan-100/65 text-xs mb-3">Connected nodes in dark space</p>
          <div className="h-px bg-cyan-400/40" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

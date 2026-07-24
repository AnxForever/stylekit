import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#0A1628]/80 text-[#00D4FF] font-semibold tracking-wide border border-[#00D4FF]/40 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:border-[#00D4FF]/70 transition-all backdrop-blur-sm">
        Activate
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0A1628]/60 backdrop-blur-md border border-[#00D4FF]/30 shadow-[0_0_20px_rgba(0,212,255,0.15)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
          <div className="text-xs font-semibold tracking-[0.2em] text-[#00D4FF]/80">HOLOGRAPHIC</div>
        </div>
        <h3 className="font-semibold text-lg mb-2 text-white/90">Holo Card</h3>
        <p className="text-sm text-[#00D4FF]/60">Transparent sci-fi panels</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Enter command..."
        className="w-full px-4 py-3 bg-[#0A1628]/50 backdrop-blur-sm border border-[#00D4FF]/30 text-[#00D4FF] placeholder-[#00D4FF]/30 focus:outline-none focus:border-[#00D4FF]/60 focus:shadow-[0_0_12px_rgba(0,212,255,0.2)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#12022a] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_45%)]" />
        <div className="w-full max-w-[210px] relative rounded-2xl p-4 border border-white/35 bg-gradient-to-br from-[#ff00f780] via-[#00d4ff80] to-[#ffee0080] backdrop-blur shadow-[0_0_24px_rgba(255,255,255,0.25)]">
          <div className="text-white text-sm font-semibold mb-2">Holographic</div>
          <p className="text-white/80 text-xs mb-3">Iridescent spectrum layers</p>
          <div className="h-2 rounded-full bg-gradient-to-r from-[#ff00f7] via-[#00d4ff] to-[#ffee00]" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

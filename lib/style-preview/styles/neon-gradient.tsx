import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold rounded-xl border-2 border-white/20 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] hover:scale-105 transition-all">
        Get Started
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl border-4 border-yellow-400 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
          <span className="text-white text-lg">Z</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-1">Speed</h3>
        <p className="text-white/80 text-sm">Blazing fast performance</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Enter email..."
        className="w-full px-4 py-3 bg-white/5 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0f0a1e] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="relative w-full max-w-[200px]">
          {/* Gradient card */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl border-4 border-yellow-400 p-3 shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-3">
            <div className="w-6 h-6 bg-white/20 rounded-lg mb-2" />
            <div className="text-white font-bold text-sm">Neon</div>
            <div className="text-white/70 text-[10px]">Gradient Style</div>
          </div>
          {/* Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 py-1.5 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg border-2 border-pink-400 text-white text-xs font-bold shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              Start
            </button>
            <button className="flex-1 py-1.5 border-2 border-cyan-400 rounded-lg text-cyan-400 text-xs font-medium">
              Demo
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

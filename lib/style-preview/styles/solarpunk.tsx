import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-r from-[#22c55e] to-[#0ea5e9] text-white font-semibold rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.25)] hover:shadow-[0_14px_40px_rgba(14,165,233,0.25)] transition-shadow">
        Explore
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f0fdf4] border border-[#22c55e]/30 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-4 rounded-full bg-[#fbbf24]" />
          <div className="h-2 w-10 rounded-full bg-[#22c55e]" />
          <div className="h-2 w-6 rounded-full bg-[#0ea5e9]" />
        </div>
        <h3 className="font-semibold text-lg text-[#2d6a4f]">Solarpunk Card</h3>
        <p className="text-sm text-[#2d6a4f]/70">Bright, breathable, green</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Type..."
        className="w-full px-4 py-3 bg-white rounded-2xl border border-[#22c55e]/30 focus:outline-none focus:ring-4 focus:ring-[#22c55e]/15"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-[#f0fdf4] via-white to-[#e0f2fe] flex items-center justify-center p-4">
        <div className="w-full max-w-[220px] bg-white rounded-2xl border border-[#22c55e]/25 shadow-[0_18px_45px_rgba(0,0,0,0.10)] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold tracking-[0.2em] text-[#2d6a4f]">SOLARPUNK</div>
            <div className="h-8 w-8 rounded-full bg-[#fbbf24] shadow-[0_0_0_6px_rgba(251,191,36,0.25)]" />
          </div>
          <p className="text-xs text-[#2d6a4f]/70 mb-3">Clean tech, nature</p>
          <button className="w-full px-3 py-2 bg-gradient-to-r from-[#22c55e] to-[#0ea5e9] text-white text-xs font-semibold rounded-full">
            Start
          </button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

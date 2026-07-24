import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1a1a2e] text-[#fbbf24] font-semibold tracking-wide border border-[#fbbf24]/70 shadow-[0_0_0_2px_rgba(251,191,36,0.15)] hover:bg-[#111126] transition-colors">
        Confirm
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#1a1a2e] border border-[#8b5cf6]/60 shadow-[0_0_0_2px_rgba(251,191,36,0.12)]">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold tracking-[0.22em] text-[#eef2ff]">STATUS</div>
          <div className="text-xs text-[#fbbf24]">LV 12</div>
        </div>
        <div className="h-2 w-full bg-white/10 border border-white/15 mb-2">
          <div className="h-full w-3/4 bg-[#ef4444]" />
        </div>
        <p className="text-xs text-[#eef2ff]/75">HP 75 / 100</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Command..."
        className="w-full px-4 py-3 bg-[#111126] border border-[#8b5cf6]/60 text-[#eef2ff] placeholder-[#eef2ff]/40 focus:outline-none focus:border-[#fbbf24]/80 transition-colors"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0b0b16] flex items-center justify-center p-4">
        <div className="w-full max-w-[220px] bg-[#1a1a2e] border border-[#8b5cf6]/70 shadow-[0_0_0_2px_rgba(251,191,36,0.15)] p-4">
          <div className="text-xs font-semibold tracking-[0.22em] text-[#eef2ff] mb-2">JRPG UI</div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 flex-1 bg-white/10 border border-white/15">
              <div className="h-full w-2/3 bg-[#ef4444]" />
            </div>
            <div className="h-2 flex-1 bg-white/10 border border-white/15">
              <div className="h-full w-1/2 bg-[#22c55e]" />
            </div>
          </div>
          <button className="w-full px-3 py-2 bg-[#111126] text-[#fbbf24] text-xs font-semibold border border-[#fbbf24]/70">
            Start Quest
          </button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

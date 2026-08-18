import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#7c3aed] text-white font-bold tracking-wider border border-[#06d6a0] hover:bg-[#ff006e] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0f0f1a] border border-[#7c3aed]">
        <h3 className="font-bold text-xl text-[#06d6a0] mb-2">Cyber Anime Card</h3>
        <p className="text-sm text-[#38bdf8]">Holographic UI</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Input data..." className="w-full px-4 py-3 bg-[#0f0f1a] border border-[#7c3aed] text-[#06d6a0] placeholder-[#06d6a0]/40 focus:outline-none focus:border-[#ff006e] transition-colors" />
    ),
    // Cover archetype: component cluster (HUD). Targeting brackets, holo panels
    // and status bars are what this style actually builds.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0f0f1a] overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:100%_6px]" />
        <div className="absolute left-5 top-5 w-[104px] h-[104px]">
          <div className="absolute left-0 top-0 w-5 h-[2px] bg-[#06d6a0]" />
          <div className="absolute left-0 top-0 h-5 w-[2px] bg-[#06d6a0]" />
          <div className="absolute right-0 top-0 w-5 h-[2px] bg-[#06d6a0]" />
          <div className="absolute right-0 top-0 h-5 w-[2px] bg-[#06d6a0]" />
          <div className="absolute left-0 bottom-0 w-5 h-[2px] bg-[#06d6a0]" />
          <div className="absolute left-0 bottom-0 h-5 w-[2px] bg-[#06d6a0]" />
          <div className="absolute right-0 bottom-0 w-5 h-[2px] bg-[#06d6a0]" />
          <div className="absolute right-0 bottom-0 h-5 w-[2px] bg-[#06d6a0]" />
          <div className="absolute left-1/2 top-1/2 h-6 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[#ff006e]" />
          <div className="absolute left-1/2 top-1/2 w-6 h-[1px] -translate-x-1/2 -translate-y-1/2 bg-[#ff006e]" />
          <div className="absolute left-1/2 top-1/2 w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38bdf8]/60" />
        </div>
        <div className="absolute right-5 top-6 w-[150px] border border-[#7c3aed] bg-[#7c3aed]/10 backdrop-blur-[1px] p-2.5">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 bg-[#06d6a0]" />
            <div className="font-mono text-[8px] tracking-[0.24em] text-[#06d6a0]">
              LINK ESTABLISHED
            </div>
          </div>
          {[
            ["SYNC", "82%", "#38bdf8"],
            ["PWR", "64%", "#ff006e"],
            ["NAV", "45%", "#06d6a0"],
          ].map(([label, value, color]) => (
            <div key={label} className="mb-1.5 last:mb-0">
              <div className="flex justify-between font-mono text-[7px] text-white/50">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <div className="mt-0.5 h-[3px] bg-white/10">
                <div
                  className="h-full"
                  style={{ width: value, backgroundColor: color }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-5 bottom-5 right-[46%] border-l-2 border-[#ff006e] pl-2">
          <div className="font-mono text-[8px] tracking-[0.2em] text-[#38bdf8]">
            SECTOR 07 // ONLINE
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

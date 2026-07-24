import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-b from-[#cd853f] to-[#8b4513] text-[#1c0f0a] font-semibold tracking-wide border-2 border-[#2d1810] shadow-[0_3px_0px_rgba(45,24,16,0.9),inset_0_1px_0px_rgba(255,255,255,0.35)] hover:translate-y-[1px] hover:shadow-[0_2px_0px_rgba(45,24,16,0.9),inset_0_1px_0px_rgba(255,255,255,0.35)] transition-all">
        Engage
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f4e4bc] border-2 border-[#2d1810] shadow-[6px_6px_0px_rgba(45,24,16,0.45)]">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#2d1810]">STEAMPUNK</div>
          <div className="h-6 w-6 border-2 border-[#b87333] bg-[#2d1810] grid place-items-center">
            <div className="h-2 w-2 bg-[#b87333]" />
          </div>
        </div>
        <p className="text-sm text-[#2d1810]/85">Brass, leather, precision</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Type..."
        className="w-full px-4 py-3 bg-[#f4e4bc] border-2 border-[#2d1810] text-[#2d1810] placeholder-[#2d1810]/40 focus:outline-none focus:shadow-[4px_4px_0px_rgba(45,24,16,0.45)] transition-shadow"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#2d1810] flex items-center justify-center p-4">
        <div className="w-full max-w-[220px] bg-[#f4e4bc] border-4 border-[#b87333] shadow-[7px_7px_0px_rgba(0,0,0,0.35)] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold tracking-[0.22em] text-[#2d1810]">STEAMPUNK</div>
            <div className="h-7 w-7 border-2 border-[#b87333] bg-[#2d1810] relative">
              <div className="absolute inset-[5px] border border-[#b87333]" />
              <div className="absolute left-1/2 top-[2px] -translate-x-1/2 w-[2px] h-[calc(100%-4px)] bg-[#b87333]" />
              <div className="absolute top-1/2 left-[2px] -translate-y-1/2 h-[2px] w-[calc(100%-4px)] bg-[#b87333]" />
            </div>
          </div>
          <p className="text-xs text-[#2d1810]/80 mb-3">Mechanica UI</p>
          <button className="w-full px-3 py-2 bg-gradient-to-b from-[#cd853f] to-[#8b4513] text-[#1c0f0a] text-xs font-semibold border-2 border-[#2d1810] shadow-[0_2px_0px_rgba(45,24,16,0.9)]">
            Start
          </button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

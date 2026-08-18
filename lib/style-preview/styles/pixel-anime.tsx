import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#4a90d9] text-white font-bold uppercase border-4 border-[#2d1b69] hover:bg-[#ff6b6b] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#2d1b69] border-4 border-[#4a90d9]">
        <h3 className="font-bold text-xl text-[#ffd93d] mb-2">Pixel Anime Card</h3>
        <p className="text-sm text-[#4a90d9]">8-bit adventure</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="TYPE..." className="w-full px-4 py-3 bg-[#2d1b69] border-4 border-[#4a90d9] text-[#ffd93d] font-mono placeholder-[#ffd93d]/40 focus:outline-none focus:border-[#ff6b6b] transition-colors" />
    ),
    // Cover archetype: game UI. Dialogue box, portrait frame, HP bar and menu -
    // the screen this style is actually used to build.
    coverPreview: () => (
      <div className="w-full h-full bg-[#2d1b69] overflow-hidden relative [image-rendering:pixelated]">
        <div className="absolute inset-0 bg-[linear-gradient(#2d1b69,#4a90d9_78%,#50c878)]" />
        <div className="absolute inset-x-0 bottom-[38%] h-3 bg-[repeating-linear-gradient(90deg,#50c878_0_8px,#3da65f_8px_16px)]" />
        <div className="relative flex items-center justify-between px-3 py-2">
          <div className="border-2 border-white bg-[#2d1b69] px-2 py-0.5 font-mono text-[8px] text-[#ffd93d]">
            LV 12
          </div>
          <div className="flex items-center gap-1.5 pr-[68px]">
            <div className="font-mono text-[7px] text-white">HP</div>
            <div className="h-2 w-16 border border-white bg-[#2d1b69]">
              <div className="h-full w-[64%] bg-[#ff6b6b]" />
            </div>
          </div>
        </div>
        <div className="absolute left-3 top-[52px] w-[52px] h-[52px] border-2 border-white bg-[#4a90d9]">
          <div className="absolute left-2 top-2 w-3 h-3 bg-[#2d1b69]" />
          <div className="absolute right-2 top-2 w-3 h-3 bg-[#2d1b69]" />
          <div className="absolute left-3 bottom-3 h-2 w-6 bg-[#ff6b6b]" />
        </div>
        <div className="absolute inset-x-3 bottom-3 border-[3px] border-white bg-[#2d1b69] px-2.5 py-2">
          <div className="font-mono text-[9px] leading-[1.5] text-white">
            A wild pixel appeared!
          </div>
          <div className="mt-1.5 flex gap-2">
            <div className="border border-[#ffd93d] px-2 py-[1px] font-mono text-[8px] text-[#ffd93d]">
              FIGHT
            </div>
            <div className="px-2 py-[1px] font-mono text-[8px] text-white/60">ITEM</div>
            <div className="px-2 py-[1px] font-mono text-[8px] text-white/60">RUN</div>
            <div className="ml-auto font-mono text-[8px] text-[#50c878]">▶</div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

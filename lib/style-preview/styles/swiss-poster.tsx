import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ff0000] text-white font-black uppercase tracking-widest hover:bg-[#000000] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#ffffff] border-4 border-[#000000]">
        <h3 className="font-black text-xl text-[#000000] uppercase tracking-wider mb-2">Swiss Poster Card</h3>
        <p className="text-sm text-[#000000]/60 uppercase">Bold typography</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="TYPE HERE..." className="w-full px-4 py-3 bg-[#ffffff] border-4 border-[#000000] text-[#000000] font-bold uppercase placeholder-[#000000]/30 focus:outline-none focus:border-[#ff0000] transition-colors" />
    ),
    // Cover archetype: layout skeleton. International Style is the grid and the
    // oversized numeral sitting on it, so show the grid instead of a card.
    coverPreview: () => (
      <div className="w-full h-full bg-white overflow-hidden relative">
        <div className="absolute inset-0 grid grid-cols-6 divide-x divide-black/15">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} />
          ))}
        </div>
        <div className="absolute inset-x-0 top-1/3 h-px bg-black/15" />
        <div className="absolute inset-x-0 top-2/3 h-px bg-black/15" />
        <div className="absolute left-0 top-0 bottom-0 w-[14%] bg-[#ff0000]" />
        <div className="relative h-full pl-[20%] pr-4 py-3 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="font-black leading-[0.7] tracking-[-0.06em] text-black text-[72px]">
              24
            </div>
            <div className="pt-1 font-black uppercase leading-[1.15] tracking-tight text-black text-[11px]">
              Grid
              <br />
              System
              <div className="mt-1 font-normal text-[8px] tracking-[0.2em] text-black/50">
                12 COL · 8PT
              </div>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div className="space-y-1 flex-1">
              <div className="h-[3px] w-full bg-black" />
              <div className="h-[3px] w-2/3 bg-black" />
              <div className="h-[3px] w-1/3 bg-black/30" />
            </div>
            <div className="w-7 h-7 bg-[#0057b8]" />
            <div className="w-7 h-7 rounded-full bg-[#ffcc00]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

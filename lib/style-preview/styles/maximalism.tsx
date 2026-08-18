import type { StylePreviewComponents } from "../types";

const preview = {
    // Cover archetype: landing hero. Clashing pattern, saturated blocks and too
    // many CTAs - but arranged as an actual page, which is the point.
    coverPreview: () => (
      <div className="w-full h-full bg-[#1a0a2e] overflow-hidden relative">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,190,11,0.16)_0_10px,transparent_10px_20px)]" />
        <div className="absolute right-0 top-0 h-full w-[38%] bg-[radial-gradient(circle_at_70%_30%,rgba(131,56,236,0.55),transparent_65%)]" />
        <div className="relative flex items-center justify-between border-b-2 border-[#ffbe0b] px-4 py-2">
          <div className="font-bold text-[14px] italic tracking-tight text-[#ffbe0b]">
            MORE!MORE!
          </div>
          <div className="flex gap-2 pr-[68px] text-[8px] font-bold uppercase">
            <span className="bg-[#06d6a0] px-1.5 text-[#1a0a2e]">New</span>
            <span className="bg-[#3a86ff] px-1.5 text-white">Sale</span>
          </div>
        </div>
        <div className="relative px-4 pt-3">
          <div className="inline-block bg-[#d4145a] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
            drop 07 · today
          </div>
          <div className="mt-1.5 font-bold text-[24px] leading-[0.98] tracking-tight text-white">
            EVERY<span className="text-[#ffbe0b]">THING</span>
            <br />
            <span className="text-[#06d6a0]">AT</span> <span className="text-[#3a86ff]">ONCE</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <div className="bg-[#ffbe0b] px-3 py-1 text-[8px] font-bold uppercase text-[#1a0a2e]">
              Shop all
            </div>
            <div className="bg-[#8338ec] px-3 py-1 text-[8px] font-bold uppercase text-white">
              Lookbook
            </div>
            <div className="border-2 border-[#06d6a0] px-2.5 py-[3px] text-[8px] font-bold uppercase text-[#06d6a0]">
              Quiz
            </div>
          </div>
        </div>
        <div className="relative mt-3 flex gap-1.5 px-4">
          {["#d4145a", "#ffbe0b", "#3a86ff", "#06d6a0", "#8338ec"].map((color) => (
            <div key={color} className="h-9 flex-1 border border-white/25" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

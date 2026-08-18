import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1a1a3e] text-[#f0ece4] font-serif tracking-wide border border-[#7b68a8] rounded-lg hover:bg-[#7b68a8] hover:text-[#f0ece4] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f0ece4] border border-[#7b68a8] rounded-lg">
        <h3 className="font-serif text-xl text-[#1a1a3e] mb-2">Surrealism Card</h3>
        <p className="text-sm text-[#1a1a3e]/70">Dream meets reality</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Enter dream..." className="w-full px-4 py-3 bg-[#f0ece4] border border-[#7b68a8] rounded-lg text-[#1a1a3e] placeholder-[#1a1a3e]/40 focus:outline-none focus:border-[#d4a574] transition-colors" />
    ),
    // Cover archetype: landing hero. Impossible objects and long shadows sit
    // behind a real museum page - nav, headline, CTA, exhibition list.
    coverPreview: () => (
      <div className="w-full h-full bg-[#f0ece4] overflow-hidden relative">
        <div className="absolute inset-x-0 bottom-0 h-[52%] bg-[linear-gradient(#e6e0d3,#d7cfc0)]" />
        <div className="absolute right-[42px] top-[76px] w-[46px] h-[58px] border border-[#1a1a3e]/50 bg-[#d4a574]" />
        <div className="absolute right-[38px] top-[134px] h-[6px] w-[92px] rounded-full bg-[#1a1a3e]/25 blur-[1px]" />
        <div className="absolute right-[104px] top-[52px] w-[34px] h-[34px] rounded-full bg-[#c38d94]" />
        <div className="absolute right-[74px] top-[88px] h-[5px] w-[70px] rounded-full bg-[#1a1a3e]/20 blur-[1px]" />
        <div className="absolute right-[58px] top-[168px] w-[26px] h-[26px] rotate-45 bg-[#7b68a8]" />
        <div className="relative flex items-center justify-between border-b border-[#1a1a3e]/25 px-4 py-2.5">
          <div className="font-serif text-[13px] italic tracking-wide text-[#1a1a3e]">
            Ceci n&rsquo;est pas
          </div>
          <div className="flex gap-3 pr-[68px] font-serif text-[8px] tracking-[0.24em] text-[#1a1a3e]/60">
            <span>WORKS</span>
            <span>ABOUT</span>
          </div>
        </div>
        <div className="relative px-4 pt-3.5 max-w-[62%]">
          <div className="font-serif text-[8px] tracking-[0.3em] text-[#7b68a8]">
            EXHIBITION · ROOM II
          </div>
          <div className="mt-1 font-serif text-[20px] leading-[1.12] text-[#1a1a3e]">
            Objects that
            <br />
            refuse the floor
          </div>
          <div className="mt-2.5 flex items-center gap-2.5">
            <div className="bg-[#1a1a3e] px-3.5 py-1.5 font-serif text-[8px] tracking-[0.2em] text-[#f0ece4]">
              Reserve
            </div>
            <div className="font-serif text-[8px] italic text-[#7b68a8] underline decoration-[#d4a574]">
              floor plan
            </div>
          </div>
        </div>
        <div className="relative mt-3.5 px-4 max-w-[64%] space-y-1.5">
          {[
            ["I", "The Weight of Air", "1931"],
            ["II", "Door Without Wall", "1937"],
          ].map(([num, title, year]) => (
            <div
              key={num}
              className="flex items-center justify-between border-t border-[#1a1a3e]/20 pt-1.5 font-serif text-[8px] text-[#1a1a3e]/75"
            >
              <span className="w-4 text-[#7b68a8]">{num}</span>
              <span className="flex-1 italic">{title}</span>
              <span className="text-[#1a1a3e]/45">{year}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#2d1b4e] text-[#c9a227] font-serif tracking-widest border border-[#c9a227] hover:bg-[#8b1a1a] hover:text-[#c9a227] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a0a] border border-[#c9a227]">
        <h3 className="font-serif text-xl text-[#c9a227] mb-2">Gothic Card</h3>
        <p className="text-sm text-[#c9a227]/60">Dark elegance</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Enter text..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a227] text-[#c9a227] placeholder-[#c9a227]/30 focus:outline-none focus:border-[#8b1a1a] transition-colors" />
    ),
    // Cover archetype: type specimen. Blackletter weight plus a rose window
    // reads as cathedral manuscript; a recoloured card read as nothing.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative flex items-stretch">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_115%,#2d1b4e_0%,transparent_60%)]" />
        <div className="relative flex-[1.35] flex flex-col justify-center pl-6 pr-3">
          <div className="font-serif leading-[0.74] text-[#c9a227] text-[86px]">
            Æ
          </div>
          <div className="mt-3 h-[2px] w-20 bg-[#8b1a1a]" />
          <div className="mt-3 font-serif text-[11px] tracking-[0.34em] text-[#c9a227]/75">
            Aa Bb Cc
          </div>
          <div className="mt-1 font-serif text-[9px] tracking-[0.26em] text-[#c9a227]/40">
            12 · 16 · 24 · 48
          </div>
        </div>
        <div className="relative flex-1 border-l border-[#c9a227]/25 flex items-center justify-center">
          <div className="relative w-[92px] h-[92px]">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {[0, 45, 90, 135].map((angle) => (
                <div
                  key={angle}
                  className="absolute left-1/2 top-1/2 h-[2px] w-[92px] bg-[#c9a227]/35"
                  style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                />
              ))}
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-[#c9a227]/70" />
            <div className="absolute inset-[14px] rounded-full border border-[#c9a227]/45" />
            <div className="absolute inset-[32px] rounded-full bg-[#8b1a1a]/70 border border-[#c9a227]/60" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

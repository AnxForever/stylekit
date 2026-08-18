import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#5a8f5a] text-[#f5f0e1] font-serif tracking-wide border border-[#8b7355] rounded-lg hover:bg-[#f5d75f] hover:text-[#5a8f5a] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#5a8f5a] rounded-lg">
        <h3 className="font-serif text-xl text-[#5a8f5a] mb-2">Cottagecore Card</h3>
        <p className="text-sm text-[#8b7355]">Pastoral charm</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Garden notes..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#5a8f5a] rounded-lg text-[#5a8f5a] placeholder-[#5a8f5a]/40 focus:outline-none focus:border-[#8b7355] transition-colors" />
    ),
    // Cover archetype: card grid. Gingham and botanicals dress a small farm shop
    // listing instead of standing alone as an illustration.
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] overflow-hidden relative">
        <div className="relative border-b-2 border-[#5a8f5a]/50 bg-[linear-gradient(90deg,rgba(90,143,90,0.32)_50%,transparent_50%),linear-gradient(rgba(90,143,90,0.32)_50%,transparent_50%)] bg-[size:14px_14px]">
          <div className="flex items-center justify-between bg-[#f5f0e1]/70 px-4 py-2.5">
            <div className="font-serif text-[15px] text-[#3f6b3f]">Meadow &amp; Jar</div>
            <div className="flex gap-3 pr-[68px] font-serif text-[9px] tracking-[0.18em] text-[#7a6144]">
              <span>PANTRY</span>
              <span>GARDEN</span>
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-2.5 px-4 pt-3">
          {[
            { name: "Rose jam", price: "$8", tint: "#c98a8a" },
            { name: "Wild honey", price: "$12", tint: "#e3bf49" },
            { name: "Herb bunch", price: "$6", tint: "#5a8f5a" },
          ].map((item) => (
            <div key={item.name} className="rounded-lg border border-[#7a6144]/45 bg-white overflow-hidden">
              <div className="relative h-[58px]" style={{ backgroundColor: `${item.tint}2e` }}>
                <svg viewBox="0 0 80 60" className="absolute inset-0 w-full h-full">
                  <path d="M40 58 C 40 40, 38 28, 36 16" fill="none" stroke="#3f6b3f" strokeWidth="2.4" />
                  <path d="M37 40 C 24 36, 16 28, 15 17 C 27 19, 35 28, 37 40 Z" fill="#5a8f5a" opacity="0.85" />
                  <path d="M39 30 C 52 27, 60 20, 61 10 C 49 12, 41 20, 39 30 Z" fill="#5a8f5a" opacity="0.6" />
                  <circle cx="36" cy="12" r="8" fill={item.tint} />
                </svg>
              </div>
              <div className="border-t border-[#7a6144]/25 px-1.5 py-1.5">
                <div className="font-serif text-[9px] text-[#3f6b3f]">{item.name}</div>
                <div className="font-serif text-[9px] font-medium text-[#7a6144]">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-3 flex items-center gap-2 px-4">
          <div className="rounded-full bg-[#3f6b3f] px-4 py-1.5 font-serif text-[9px] tracking-wide text-[#f5f0e1]">
            Add to basket
          </div>
          <div className="rounded-full border border-[#7a6144]/60 px-3.5 py-1.5 font-serif text-[9px] text-[#7a6144]">
            Recipes
          </div>
          <div className="ml-auto font-serif text-[9px] italic text-[#3f6b3f]/70">free delivery</div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

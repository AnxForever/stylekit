import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#2d5016] text-[#f5f0e1] font-serif tracking-wide border border-[#c9a227] rounded hover:bg-[#c9a227] hover:text-[#2d5016] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#c9a227] rounded">
        <h3 className="font-serif text-xl text-[#2d5016] mb-2">Art Nouveau Card</h3>
        <p className="text-sm text-[#2d5016]/70">Organic elegance</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Type here..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#c9a227] rounded text-[#2d5016] placeholder-[#2d5016]/40 focus:outline-none focus:border-[#2d5016] transition-colors" />
    ),
    // Cover archetype: landing hero. The vine ornament frames a boutique header
    // that sits above a real product strip.
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] overflow-hidden relative">
        <svg viewBox="0 0 372 279" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M-6 92 C 46 70, 58 22, 118 14" fill="none" stroke="#4a7c59" strokeWidth="2" opacity="0.5" />
          <path d="M-6 108 C 52 88, 64 40, 132 28" fill="none" stroke="#c9a227" strokeWidth="1.2" opacity="0.6" />
          <path d="M24 88 C 42 72, 70 78, 74 58 C 54 58, 32 68, 24 88 Z" fill="#4a7c59" opacity="0.35" />
        </svg>
        <div className="relative flex items-center justify-between border-b border-[#c9a227]/60 px-5 py-2.5">
          <div className="font-serif text-[14px] italic tracking-wide text-[#2d5016]">
            Maison Verte
          </div>
          <div className="flex gap-3 pr-[68px] font-serif text-[8px] tracking-[0.26em] text-[#2d5016]/70">
            <span>ATELIER</span>
            <span>SHOP</span>
          </div>
        </div>
        <div className="relative px-5 pt-3.5">
          <div className="font-serif text-[8px] tracking-[0.34em] text-[#8b6db5]">
            SPRING COLLECTION
          </div>
          <div className="mt-1 font-serif text-[21px] leading-[1.12] text-[#2d5016]">
            Curves drawn from
            <br />
            the garden
          </div>
          <div className="mt-2.5 flex items-center gap-2.5">
            <div className="bg-[#2d5016] px-3.5 py-1.5 font-serif text-[9px] tracking-[0.2em] text-[#f5f0e1]">
              Discover
            </div>
            <div className="font-serif text-[9px] italic text-[#8b6db5] underline decoration-[#c9a227]">
              lookbook
            </div>
          </div>
        </div>
        <div className="relative mt-3 grid grid-cols-3 gap-2.5 px-5">
          {[
            { name: "Iris vase", price: "€120", tint: "#8b6db5" },
            { name: "Vine lamp", price: "€260", tint: "#4a7c59" },
            { name: "Gilt mirror", price: "€340", tint: "#c9a227" },
          ].map((item) => (
            <div key={item.name} className="border border-[#c9a227]/70 rounded-t-full overflow-hidden bg-white/50">
              <div className="h-[36px]" style={{ backgroundColor: `${item.tint}26` }} />
              <div className="border-t border-[#c9a227]/40 px-1.5 py-1 text-center">
                <div className="font-serif text-[7.5px] text-[#2d5016]">{item.name}</div>
                <div className="font-serif text-[7.5px] text-[#8b6db5]">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#4a1a4a] text-[#c9a2c9] font-serif tracking-wide border border-[#8b1a2a] rounded hover:bg-[#8b1a2a] hover:text-[#e5e5e5] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#e5e5e5] border border-[#4a1a4a] rounded">
        <h3 className="font-serif text-xl text-[#4a1a4a] mb-2">Gothic Lolita Card</h3>
        <p className="text-sm text-[#8b1a2a]">Dark romantic elegance</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Whisper..." className="w-full px-4 py-3 bg-[#e5e5e5] border border-[#4a1a4a] rounded text-[#4a1a4a] placeholder-[#4a1a4a]/40 focus:outline-none focus:border-[#8b1a2a] transition-colors" />
    ),
    // Cover archetype: card grid. Lace trim and ribbon become the chrome of a
    // lookbook shop instead of a floating motif.
    coverPreview: () => (
      <div className="w-full h-full bg-[#e5e5e5] overflow-hidden relative">
        <div className="relative bg-[#0a0a0a] px-4 pt-2 pb-3">
          <div className="flex items-center justify-between">
            <div className="font-serif text-[13px] italic tracking-wide text-[#c9a2c9]">
              Rosenkranz
            </div>
            <div className="flex gap-3 pr-[68px] font-serif text-[8px] tracking-[0.24em] text-[#c9a2c9]/70">
              <span>DRESSES</span>
              <span>LACE</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[46px] h-4 bg-[radial-gradient(circle_at_50%_0%,#0a0a0a_46%,transparent_47%)] bg-[size:18px_18px] bg-repeat-x" />
        <div className="relative grid grid-cols-3 gap-2.5 px-4 pt-6">
          {[
            { name: "Cathedral", price: "¥28,000", tint: "#4a1a4a" },
            { name: "Rosette", price: "¥19,800", tint: "#8b1a2a" },
            { name: "Veil", price: "¥24,600", tint: "#c9a2c9" },
          ].map((item) => (
            <div key={item.name} className="border border-[#4a1a4a]/40 bg-white">
              <div className="relative h-[52px] flex items-center justify-center" style={{ backgroundColor: `${item.tint}22` }}>
                <div className="w-8 h-8 rounded-full border border-[#4a1a4a]/50" />
                <div className="absolute w-4 h-4 rounded-full" style={{ backgroundColor: item.tint }} />
              </div>
              <div className="px-1.5 py-1">
                <div className="font-serif text-[8px] text-[#4a1a4a]">{item.name}</div>
                <div className="font-serif text-[8px] text-[#8b1a2a]">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-2.5 flex items-center gap-2 px-4">
          <div className="bg-[#4a1a4a] px-3.5 py-1 font-serif text-[8px] tracking-[0.2em] text-[#c9a2c9]">
            Add to bag
          </div>
          <div className="border border-[#8b1a2a] px-3 py-1 font-serif text-[8px] tracking-[0.2em] text-[#8b1a2a]">
            Size guide
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

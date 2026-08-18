import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ff6b9d] text-[#f5f5f0] font-bold tracking-wide border-2 border-[#2563eb] rounded hover:bg-[#2563eb] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f5f0] border-2 border-[#ff6b9d] rounded">
        <h3 className="font-bold text-xl text-[#2563eb] mb-2">Risograph Card</h3>
        <p className="text-sm text-[#ff6b9d]">Overprint aesthetic</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Print here..." className="w-full px-4 py-3 bg-[#f5f5f0] border-2 border-[#2563eb] rounded text-[#ff6b9d] placeholder-[#ff6b9d]/40 focus:outline-none focus:border-[#ff8a00] transition-colors" />
    ),
    // Cover archetype: card grid. Riso halftone and misregistration show up as
    // the paper and thumbnails of a zine shop, not as free-floating shapes.
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f5f0] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1.4px,transparent_1.5px)] bg-[size:11px_11px] opacity-25" />
        <div className="relative flex items-center justify-between border-b-2 border-[#2563eb] px-4 py-2">
          <div className="font-bold text-[13px] tracking-tight text-[#2563eb]">
            Duplicator Press
          </div>
          <div className="flex gap-2.5 pr-[68px] text-[8px] font-bold uppercase tracking-[0.16em] text-[#ff6b9d]">
            <span>Zines</span>
            <span>Prints</span>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-2.5 px-4 pt-3">
          {[
            { top: "#ff8a00", over: "#ff6b9d", title: "Riso No.1", price: "$18" },
            { top: "#22c55e", over: "#2563eb", title: "Overprint", price: "$24" },
            { top: "#ff6b9d", over: "#ff8a00", title: "Two Colour", price: "$16" },
          ].map((item) => (
            <div key={item.title} className="border border-[#2d2d2d]/20 bg-white/70">
              <div className="relative h-[62px] overflow-hidden">
                <div
                  className="absolute left-2 top-2 w-11 h-11 rounded-full mix-blend-multiply opacity-80"
                  style={{ backgroundColor: item.top }}
                />
                <div
                  className="absolute left-[26px] top-[18px] w-11 h-11 rounded-full mix-blend-multiply opacity-70"
                  style={{ backgroundColor: item.over }}
                />
              </div>
              <div className="border-t border-[#2d2d2d]/15 px-1.5 py-1">
                <div className="text-[8px] font-bold text-[#2d2d2d]">{item.title}</div>
                <div className="text-[8px] text-[#2563eb]">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-3 flex items-center gap-2 px-4">
          <div className="bg-[#ff6b9d] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#f5f5f0]">
            Add to cart
          </div>
          <div className="border border-[#2563eb] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#2563eb]">
            Catalogue
          </div>
          <div className="ml-auto relative w-3.5 h-3.5">
            <div className="absolute left-1/2 top-0 h-3.5 w-[1px] -translate-x-1/2 bg-[#ff6b9d]" />
            <div className="absolute top-1/2 left-0 w-3.5 h-[1px] -translate-y-1/2 bg-[#2563eb]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

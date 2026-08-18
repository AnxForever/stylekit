import type { StylePreviewComponents } from "../types";

const preview = {
    // Cover archetype: card grid. Arches frame real product tiles in a clay-toned
    // storefront.
    coverPreview: () => (
      <div className="w-full h-full bg-[#faf5ef] overflow-hidden relative">
        <div className="flex items-center justify-between border-b border-[#b5654a]/30 px-4 py-2.5">
          <div className="font-serif text-[14px] tracking-wide text-[#b5654a]">Argila</div>
          <div className="flex gap-3 pr-[68px] font-serif text-[8px] tracking-[0.22em] text-[#7a6350]">
            <span>CERAMICS</span>
            <span>STORE</span>
          </div>
        </div>
        <div className="px-4 pt-3">
          <div className="font-serif text-[8px] tracking-[0.3em] text-[#8b9d77]">
            HAND THROWN
          </div>
          <div className="mt-1 font-serif text-[17px] leading-tight text-[#5f4032]">
            Warm clay for slow rooms
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 px-4 pt-3">
          {[
            { name: "Olive jar", price: "€48", tint: "#b5654a" },
            { name: "Wide bowl", price: "€36", tint: "#d4a373" },
            { name: "Vase no.4", price: "€62", tint: "#8b9d77" },
          ].map((item) => (
            <div key={item.name}>
              <div
                className="h-[52px] rounded-t-full border border-[#b5654a]/35"
                style={{ backgroundColor: `${item.tint}33` }}
              />
              <div className="mt-1.5 font-serif text-[8px] text-[#5f4032]">{item.name}</div>
              <div className="font-serif text-[8px] text-[#7a6350]">{item.price}</div>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center gap-2 px-4">
          <div className="rounded-full bg-[#b5654a] px-4 py-1.5 font-serif text-[8px] tracking-[0.16em] text-[#faf5ef]">
            Add to cart
          </div>
          <div className="rounded-full border border-[#7a6350]/45 px-3.5 py-1.5 font-serif text-[8px] text-[#7a6350]">
            Studio visit
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

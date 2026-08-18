import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ffb7c5] text-white font-medium rounded-full hover:bg-[#c4b5fd] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#fff5f7] border border-[#ffb7c5] rounded-2xl">
        <h3 className="text-xl text-[#ffb7c5] mb-2">Shoujo Card</h3>
        <p className="text-sm text-[#c4b5fd]">Romantic sparkle</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Whisper..." className="w-full px-4 py-3 bg-[#fff5f7] border border-[#ffb7c5] rounded-full text-[#ffb7c5] placeholder-[#ffb7c5]/40 focus:outline-none focus:border-[#c4b5fd] transition-colors" />
    ),
    // Cover archetype: card grid. Screentone, sparkle and rounded chrome shown as
    // a real shop listing.
    coverPreview: () => (
      <div className="w-full h-full bg-[#fff5f7] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ffb7c5_1.4px,transparent_1.5px)] bg-[size:10px_10px] opacity-45" />
        <div className="relative flex items-center justify-between border-b border-[#ffb7c5] px-4 py-2.5">
          <div className="font-serif text-[14px] italic text-[#d1708c]">Yumemiru</div>
          <div className="flex gap-3 pr-[68px] text-[8px] tracking-[0.2em] text-[#d1708c]/70">
            <span>ときめき</span>
            <span>SHOP</span>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-2.5 px-4 pt-3">
          {[
            { name: "Sakura pin", price: "¥980", tint: "#ffb7c5" },
            { name: "Star clip", price: "¥1,200", tint: "#fde68a" },
            { name: "Dream tote", price: "¥2,400", tint: "#c4b5fd" },
          ].map((item) => (
            <div key={item.name} className="rounded-2xl border border-[#ffb7c5] bg-white overflow-hidden">
              <div className="relative h-[54px]" style={{ backgroundColor: `${item.tint}55` }}>
                <div className="absolute left-3 top-3 text-[13px] leading-none text-white drop-shadow-[0_1px_0_rgba(209,112,140,0.5)]">
                  ✦
                </div>
                <div className="absolute right-3 bottom-3 text-[9px] leading-none text-white/90">✧</div>
                <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
              </div>
              <div className="px-2 py-1.5">
                <div className="text-[8px] text-[#d1708c]">{item.name}</div>
                <div className="text-[8px] text-[#b48ead]">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-3 flex items-center gap-2 px-4">
          <div className="rounded-full bg-[#ffb7c5] px-4 py-1.5 text-[8px] tracking-[0.16em] text-white shadow-[0_2px_0_#d1708c]">
            カートへ
          </div>
          <div className="rounded-full border border-[#c4b5fd] px-3.5 py-1.5 text-[8px] tracking-[0.16em] text-[#8b7bb8]">
            お気に入り
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

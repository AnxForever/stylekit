import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#64b5f6] text-white font-light tracking-wide rounded-full hover:bg-[#98d8c8] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#fafaf8] border border-[#64b5f6]/20 rounded-2xl">
        <h3 className="text-xl text-[#64b5f6] font-light mb-2">Fresh Card</h3>
        <p className="text-sm text-[#98d8c8]">Light and airy</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Type gently..." className="w-full px-4 py-3 bg-[#fafaf8] border border-[#64b5f6]/20 rounded-full text-[#64b5f6] placeholder-[#64b5f6]/30 focus:outline-none focus:border-[#98d8c8] transition-colors" />
    ),
    // Cover archetype: card grid. Thin rules, airy spacing and pastel accents
    // shown as a real Japanese lifestyle storefront.
    coverPreview: () => (
      <div className="w-full h-full bg-[#fafaf8] overflow-hidden relative">
        <div className="flex items-center justify-between border-b border-[#64b5f6]/30 px-5 py-2.5">
          <div className="text-[13px] tracking-[0.22em] text-[#2f4a5f]">kurashi</div>
          <div className="flex gap-3 pr-[68px] text-[8px] tracking-[0.2em] text-[#5c7385]">
            <span>くらし</span>
            <span>SHOP</span>
          </div>
        </div>
        <div className="flex items-end justify-between px-5 pt-3">
          <div>
            <div className="text-[8px] tracking-[0.3em] text-[#3f9d8a]">NEW ARRIVALS</div>
            <div className="mt-1 text-[15px] leading-snug text-[#2f4a5f]">
              軽やかな暮らしの道具
            </div>
          </div>
          <div className="text-[8px] tracking-[0.18em] text-[#5c7385]">全 24 点</div>
        </div>
        <div className="grid grid-cols-3 gap-3 px-5 pt-3">
          {[
            { name: "glass cup", price: "¥1,800", tint: "#64b5f6", shape: "rounded-b-[26px]" },
            { name: "linen wrap", price: "¥3,200", tint: "#ffb7c5", shape: "rounded-sm" },
            { name: "tea pot", price: "¥5,600", tint: "#3f9d8a", shape: "rounded-full" },
          ].map((item) => (
            <div key={item.name} className="border border-[#dfe6ea] bg-white">
              <div className="relative h-[58px] bg-[#f5f8fa] flex items-center justify-center">
                <div
                  className={`w-8 h-9 border ${item.shape}`}
                  style={{ borderColor: item.tint, backgroundColor: `${item.tint}22` }}
                />
              </div>
              <div className="border-t border-[#eef2f4] px-1.5 py-1.5">
                <div className="text-[8px] text-[#2f4a5f]">{item.name}</div>
                <div className="text-[8px] text-[#5c7385]">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 px-5">
          <div className="rounded-sm bg-[#64b5f6] px-3.5 py-1.5 text-[8px] tracking-[0.16em] text-white">
            カートに入れる
          </div>
          <div className="rounded-sm border border-[#64b5f6]/50 px-3 py-1.5 text-[8px] tracking-[0.16em] text-[#3f7ea8]">
            詳細
          </div>
          <div className="ml-auto text-[8px] tracking-[0.16em] text-[#5c7385]">送料無料</div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

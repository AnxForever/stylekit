import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1a3055] text-[#f5f0e1] font-serif tracking-wide border border-[#d4553a] rounded hover:bg-[#d4553a] hover:text-[#f5f0e1] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#1a3055] rounded">
        <h3 className="font-serif text-xl text-[#1a3055] mb-2">Ukiyo-e Card</h3>
        <p className="text-sm text-[#1a3055]/70">Digital woodblock</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Type here..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#1a3055] rounded text-[#1a3055] placeholder-[#1a3055]/40 focus:outline-none focus:border-[#d4553a] transition-colors" />
    ),
    // Cover archetype: gallery. Wave pattern and flat colour blocks become the
    // header and print tiles of a real print shop.
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] overflow-hidden relative">
        <div className="relative border-b-2 border-[#1a3055] bg-[#1a3055] px-4 py-2 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,transparent_40%,rgba(61,107,142,0.9)_41%,transparent_44%)] bg-[size:26px_16px]" />
          <div className="relative flex items-center justify-between">
            <div className="font-serif text-[13px] tracking-[0.24em] text-[#f5f0e1]">
              浮世 · PRINTS
            </div>
            <div className="flex gap-3 pr-[68px] font-serif text-[8px] tracking-[0.2em] text-[#c9a227]">
              <span>版画</span>
              <span>SHOP</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 px-4 pt-3">
          {[
            { name: "Great Wave", price: "¥6,800", sky: "#3d6b8e", mark: "#1a3055" },
            { name: "Red Fuji", price: "¥5,200", sky: "#d4553a", mark: "#1a3055" },
            { name: "Night Rain", price: "¥4,400", sky: "#1a3055", mark: "#c9a227" },
          ].map((item) => (
            <div key={item.name} className="border border-[#1a3055]/40 bg-white p-1">
              <div className="relative h-[52px] overflow-hidden" style={{ backgroundColor: `${item.sky}33` }}>
                <div
                  className="absolute inset-x-0 bottom-0 h-6"
                  style={{ backgroundColor: item.sky, clipPath: "polygon(0 60%,22% 20%,42% 66%,64% 24%,86% 62%,100% 34%,100% 100%,0 100%)" }}
                />
                <div className="absolute right-1.5 top-1.5 w-3.5 h-3.5" style={{ backgroundColor: item.mark }} />
              </div>
              <div className="px-0.5 pt-1">
                <div className="font-serif text-[8px] text-[#1a3055]">{item.name}</div>
                <div className="font-serif text-[8px] text-[#d4553a]">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 px-4">
          <div className="bg-[#d4553a] px-3.5 py-1 font-serif text-[8px] tracking-[0.18em] text-[#f5f0e1]">
            購入する
          </div>
          <div className="border border-[#1a3055] px-3 py-1 font-serif text-[8px] tracking-[0.18em] text-[#1a3055]">
            額装オプション
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

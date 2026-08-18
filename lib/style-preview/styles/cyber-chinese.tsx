import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#d4553a] text-[#c9a227] font-bold tracking-wider border border-[#c9a227] hover:bg-[#a020f0] hover:text-[#00d4ff] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a0a] border border-[#d4553a]">
        <h3 className="font-bold text-xl text-[#d4553a] mb-2">Cyber Chinese Card</h3>
        <p className="text-sm text-[#00d4ff]">Eastern futurism</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Input..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a227] text-[#d4553a] placeholder-[#d4553a]/40 focus:outline-none focus:border-[#00d4ff] transition-colors" />
    ),
    // Cover archetype: card grid. Neon ink-wash and seal marks dress a real
    // storefront listing instead of standing alone as a scroll painting.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative">
        <svg viewBox="0 0 372 90" className="absolute inset-x-0 top-[38px] w-full h-[64px] opacity-40" preserveAspectRatio="none">
          <path d="M0 90 L54 40 L96 72 L150 26 L206 76 L262 38 L322 82 L372 48 L372 90 Z" fill="#1a1a1a" />
          <path d="M0 90 L54 40 L96 72 L150 26 L206 76 L262 38 L322 82 L372 48" fill="none" stroke="#00d4ff" strokeWidth="1.2" />
        </svg>
        <div className="relative flex items-center justify-between border-b border-[#d4553a]/60 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#d4553a] flex items-center justify-center font-serif text-[11px] leading-none text-[#0a0a0a]">
              印
            </div>
            <div className="font-serif text-[12px] tracking-[0.2em] text-[#c9a227]">
              山海集
            </div>
          </div>
          <div className="flex gap-3 pr-[68px] font-serif text-[8px] tracking-[0.24em] text-[#00d4ff]/80">
            <span>新品</span>
            <span>典藏</span>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-2.5 px-4 pt-3">
          {[
            { name: "青峰壶", price: "¥328", glow: "#d4553a" },
            { name: "赤霄灯", price: "¥466", glow: "#a020f0" },
            { name: "墨山屏", price: "¥899", glow: "#00d4ff" },
          ].map((item) => (
            <div
              key={item.name}
              className="border bg-[#0f0f14] p-1.5"
              style={{ borderColor: `${item.glow}66` }}
            >
              <div
                className="h-[46px]"
                style={{ background: `linear-gradient(160deg, ${item.glow}44, transparent 70%)` }}
              />
              <div className="mt-1 font-serif text-[8px] text-[#c9a227]">{item.name}</div>
              <div className="font-serif text-[8px]" style={{ color: item.glow }}>
                {item.price}
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-3 flex items-center gap-2 px-4">
          <div className="bg-[#d4553a] px-3.5 py-1 font-serif text-[8px] tracking-[0.2em] text-[#0a0a0a] shadow-[0_0_14px_rgba(212,85,58,0.6)]">
            立即购买
          </div>
          <div className="border border-[#c9a227] px-3 py-1 font-serif text-[8px] tracking-[0.2em] text-[#c9a227]">
            加入收藏
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

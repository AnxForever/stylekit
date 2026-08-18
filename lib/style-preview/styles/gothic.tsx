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
    // Cover archetype: article page. Blackletter masthead, arched header band and
    // a rose-window plate sit inside a real reading layout.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,#2d1b4e_0%,transparent_62%)]" />
        <div className="relative flex items-center justify-between border-b border-[#c9a227]/40 px-4 py-2">
          <div className="font-serif text-[14px] tracking-[0.2em] text-[#c9a227]">
            Scriptorium
          </div>
          <div className="flex gap-3 pr-[68px] font-serif text-[8px] tracking-[0.26em] text-[#c9a227]/60">
            <span>ARCHIVE</span>
            <span>ORDERS</span>
          </div>
        </div>
        <div className="relative flex gap-3.5 px-4 pt-3">
          <div className="flex-1">
            <div className="font-serif text-[8px] tracking-[0.32em] text-[#8b1a1a]">
              CHAPTER XIV
            </div>
            <div className="mt-1 font-serif text-[19px] leading-[1.14] text-[#c9a227]">
              On the Vaulted Arch
            </div>
            <div className="mt-2 h-[2px] w-14 bg-[#8b1a1a]" />
            <div className="mt-2.5 space-y-[5px]">
              {[100, 96, 88, 94, 82, 68].map((width, index) => (
                <div
                  key={index}
                  className="h-[3px] bg-[#c9a227]/25"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
            <div className="mt-3 inline-block border border-[#c9a227] px-3 py-1 font-serif text-[8px] tracking-[0.26em] text-[#c9a227]">
              READ ON
            </div>
          </div>
          <div className="w-[112px] shrink-0">
            <div className="relative h-[128px] border border-[#c9a227]/40 bg-[#12080f] flex items-center justify-center rounded-t-[50%_38px]">
              <div className="relative w-[68px] h-[68px]">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  {[0, 45, 90, 135].map((angle) => (
                    <div
                      key={angle}
                      className="absolute left-1/2 top-1/2 h-[1.5px] w-[68px] bg-[#c9a227]/35"
                      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-[#c9a227]/70" />
                <div className="absolute inset-[11px] rounded-full border border-[#c9a227]/45" />
                <div className="absolute inset-[24px] rounded-full bg-[#8b1a1a]/75 border border-[#c9a227]/60" />
              </div>
            </div>
            <div className="mt-2 font-serif text-[7px] tracking-[0.24em] text-[#c9a227]/50">
              PLATE II · ROSE
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

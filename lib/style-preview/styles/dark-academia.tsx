import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#3d2b1f] text-[#f5f0e1] font-serif tracking-wide border border-[#8b7355] rounded hover:bg-[#6b4c3b] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#8b7355] rounded">
        <h3 className="font-serif text-xl text-[#3d2b1f] mb-2">Dark Academia Card</h3>
        <p className="text-sm text-[#3d2b1f]/70">Classical knowledge</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Search texts..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#8b7355] rounded text-[#3d2b1f] placeholder-[#3d2b1f]/40 focus:outline-none focus:border-[#3d2b1f] transition-colors" />
    ),
    // Cover archetype: article page. The drop cap and ruled columns sit under a
    // real journal masthead with navigation.
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,rgba(61,43,31,0.07),transparent_62%)]" />
        <div className="relative flex items-center justify-between border-b-2 border-[#3d2b1f] px-4 py-2">
          <div className="font-serif text-[14px] tracking-[0.14em] text-[#3d2b1f]">
            The Quarterly
          </div>
          <div className="flex gap-3 pr-[68px] font-serif text-[8px] tracking-[0.24em] text-[#6b4c3b]">
            <span>ESSAYS</span>
            <span>LIBRARY</span>
          </div>
        </div>
        <div className="relative px-4 pt-3">
          <div className="font-serif text-[8px] tracking-[0.3em] text-[#2d4a3e]">
            VOL. XIV · LATIN STUDIES
          </div>
          <div className="mt-1 font-serif text-[19px] leading-[1.15] text-[#3d2b1f]">
            On Lamplight and Marginalia
          </div>
          <div className="mt-1 font-serif text-[8px] italic text-[#6b4c3b]">
            by E. Ashcombe · 12 min read
          </div>
          <div className="mt-2.5 flex gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <div className="font-serif leading-[0.8] text-[#3d2b1f] text-[34px]">V</div>
                <div className="flex-1 space-y-[4px] pt-1">
                  {[100, 92, 84].map((width, index) => (
                    <div
                      key={index}
                      className="h-[3px] bg-[#3d2b1f]/30"
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-1.5 space-y-[4px]">
                {[96, 88, 100, 70].map((width, index) => (
                  <div
                    key={index}
                    className="h-[3px] bg-[#3d2b1f]/22"
                    style={{ width: `${width}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="w-[110px] shrink-0 border-l border-[#8b7355]/40 pl-2.5">
              <div className="font-serif text-[9px] italic leading-[1.5] text-[#2d4a3e]">
                &ldquo;The margin is where reading becomes argument.&rdquo;
              </div>
              <div className="mt-2 flex items-end gap-1">
                <div className="w-3 h-9 bg-[#3d2b1f]" />
                <div className="w-2.5 h-7 bg-[#6b4c3b]" />
                <div className="w-3.5 h-11 bg-[#2d4a3e]" />
                <div className="w-2 h-6 bg-[#8b7355]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

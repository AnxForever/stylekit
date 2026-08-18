import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ffff00] text-black font-black uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_#00ccff] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
        Pow
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ff0066]">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="h-3 w-3 bg-[#ff0066] border-2 border-black" />
          <div className="h-3 w-3 bg-[#00ccff] border-2 border-black" />
          <div className="h-3 w-3 bg-[#ffff00] border-2 border-black" />
        </div>
        <h3 className="font-black text-xl">Pop Art Card</h3>
        <p className="text-sm text-black/70">Bold dots, loud colors</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Type..."
        className="w-full px-4 py-3 bg-white border-4 border-black text-black placeholder-black/40 focus:outline-none focus:shadow-[5px_5px_0px_0px_#ff0066] transition-shadow"
      />
    ),
    // Cover archetype: landing hero. Ben-Day dots and a comic panel behind a real
    // product header and CTA.
    coverPreview: () => (
      <div className="w-full h-full bg-[#ffff00] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ff0066_2px,transparent_2.2px)] bg-[size:12px_12px] opacity-35" />
        <div className="relative flex items-center justify-between border-b-4 border-black px-4 py-2">
          <div className="font-black text-[15px] italic tracking-tight text-black">
            BOOM!
          </div>
          <div className="flex gap-3 pr-[68px] text-[8px] font-black uppercase tracking-wide text-black/70">
            <span>Comics</span>
            <span>Prints</span>
          </div>
        </div>
        <div className="relative flex gap-3 px-4 pt-3">
          <div className="flex-1">
            <div className="inline-block border-2 border-black bg-white px-2 py-0.5 text-[8px] font-black uppercase text-black">
              issue #42
            </div>
            <div className="mt-1.5 font-black text-[22px] leading-[0.98] uppercase tracking-tight text-black">
              Pow to the
              <br />
              people
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="border-2 border-black bg-[#00ccff] px-3 py-1 text-[8px] font-black uppercase text-black shadow-[3px_3px_0_#000]">
                Buy $9
              </div>
              <div className="border-2 border-black bg-white px-3 py-1 text-[8px] font-black uppercase text-black">
                Preview
              </div>
            </div>
          </div>
          <div className="w-[104px] shrink-0 border-4 border-black bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#00ccff_2px,transparent_2.2px)] bg-[size:9px_9px] opacity-70" />
            <div className="absolute left-2 top-2 h-8 w-8 rounded-full border-4 border-black bg-[#ff6600]" />
            <div className="absolute right-1.5 bottom-6 border-2 border-black bg-[#cc00ff] px-1.5 py-[1px] text-[7px] font-black uppercase text-white">
              zap!
            </div>
            <div className="absolute inset-x-0 bottom-0 border-t-4 border-black bg-[#ff0066] px-1.5 py-0.5 text-[7px] font-black uppercase text-white">
              new
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

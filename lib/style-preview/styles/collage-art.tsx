import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#e74c3c] text-white font-bold tracking-wide border-2 border-[#2d2d2d] rounded hover:bg-[#3498db] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded rotate-1">
        <h3 className="font-bold text-xl text-[#2d2d2d] mb-2">Collage Card</h3>
        <p className="text-sm text-[#9b59b6]">Cut and paste</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Paste here..." className="w-full px-4 py-3 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded text-[#2d2d2d] placeholder-[#2d2d2d]/40 focus:outline-none focus:border-[#e74c3c] transition-colors" />
    ),
    // Cover archetype: card grid. Torn scraps and tape become the thumbnails and
    // chrome of a magazine index rather than a standalone pile of paper.
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e8] overflow-hidden relative">
        <div className="relative flex items-center justify-between border-b-2 border-[#2d2d2d] px-4 py-2">
          <div className="font-bold text-[14px] tracking-tight text-[#2d2d2d] -rotate-1">
            CUT/PASTE
          </div>
          <div className="flex gap-2.5 pr-[68px] text-[8px] font-bold uppercase tracking-wide text-[#2d2d2d]/70">
            <span>Issues</span>
            <span>Shop</span>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-2 px-3 pt-3">
          {[
            { bg: "#3498db", rotate: "-rotate-2", clip: "polygon(0 5%,97% 0,100% 94%,3% 100%)", title: "Paper" },
            { bg: "#f39c12", rotate: "rotate-1", clip: "polygon(3% 0,100% 4%,95% 100%,0 95%)", title: "Scissors" },
            { bg: "#9b59b6", rotate: "-rotate-1", clip: "polygon(5% 2%,100% 0,96% 97%,0 100%)", title: "Glue" },
          ].map((item) => (
            <div key={item.title} className={`bg-white border border-[#2d2d2d] ${item.rotate}`}>
              <div
                className="h-[58px]"
                style={{ backgroundColor: item.bg, clipPath: item.clip }}
              />
              <div className="px-1.5 py-1">
                <div className="text-[8px] font-bold text-[#2d2d2d]">{item.title}</div>
                <div className="mt-0.5 h-[2px] w-2/3 bg-[#2d2d2d]/30" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-[86px] top-[74px] w-12 h-3.5 bg-[#2d2d2d]/15 -rotate-[8deg]" />
        <div className="absolute right-[74px] top-[128px] w-11 h-3.5 bg-[#2d2d2d]/15 rotate-[7deg]" />
        <div className="relative mt-3 flex items-center gap-2 px-4">
          <div className="bg-[#e74c3c] px-3 py-1 text-[8px] font-bold uppercase text-white rotate-1">
            Subscribe
          </div>
          <div className="border-2 border-[#2d2d2d] bg-white px-3 py-1 text-[8px] font-bold uppercase text-[#2d2d2d] -rotate-1">
            Archive
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

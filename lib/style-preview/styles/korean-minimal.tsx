import type { StylePreviewComponents } from "../types";

const preview = {
    // Cover archetype: component cluster. This style is defined by radius,
    // restraint and pastel accents, which only read on real controls. The hanji
    // paper tone and off-centre column keep it from reading as generic soft UI.
    coverPreview: () => (
      <div className="w-full h-full bg-[#faf9f7] overflow-hidden relative">
        <div className="absolute inset-y-0 right-0 w-[22%] bg-[#e8d4b8]/25 border-l border-[#3d4a5c]/8 flex items-center justify-center">
          <div className="font-serif text-[9px] tracking-[0.4em] text-[#3d4a5c]/35 [writing-mode:vertical-rl]">
            여백 · 餘白
          </div>
        </div>
        <div className="relative h-full pl-6 pr-[26%] flex flex-col justify-center gap-2.5">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-7 rounded-full bg-white border border-[#3d4a5c]/12 shadow-[0_1px_2px_rgba(61,74,92,0.05)] flex items-center px-3">
              <div className="h-1 w-10 rounded-full bg-[#3d4a5c]/20" />
            </div>
            <div className="w-10 h-6 rounded-full bg-[#a8c5b8] relative shrink-0">
              <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-[0_1px_2px_rgba(61,74,92,0.12)]" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 rounded-full bg-[#d4a5a5]/25 text-[9px] text-[#3d4a5c]/70">
              Serum
            </div>
            <div className="px-3 py-1 rounded-full bg-[#e8d4b8]/45 text-[9px] text-[#3d4a5c]/70">
              Toner
            </div>
            <div className="px-3 py-1 rounded-full border border-[#3d4a5c]/12 text-[9px] text-[#3d4a5c]/45">
              Mask
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl bg-white border border-[#3d4a5c]/10 p-2.5 shadow-[0_2px_10px_rgba(61,74,92,0.06)]">
            <div className="w-9 h-9 rounded-xl bg-[#d4a5a5]/30 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-2/3 rounded-full bg-[#3d4a5c]/25" />
              <div className="h-1.5 w-1/3 rounded-full bg-[#3d4a5c]/12" />
            </div>
            <div className="w-6 h-6 rounded-full border border-[#3d4a5c]/15 shrink-0" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

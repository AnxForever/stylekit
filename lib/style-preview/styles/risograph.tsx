import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ff6b9d] text-[#f5f5f0] font-bold tracking-wide border-2 border-[#2563eb] rounded hover:bg-[#2563eb] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f5f0] border-2 border-[#ff6b9d] rounded">
        <h3 className="font-bold text-xl text-[#2563eb] mb-2">Risograph Card</h3>
        <p className="text-sm text-[#ff6b9d]">Overprint aesthetic</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Print here..." className="w-full px-4 py-3 bg-[#f5f5f0] border-2 border-[#2563eb] rounded text-[#ff6b9d] placeholder-[#ff6b9d]/40 focus:outline-none focus:border-[#ff8a00] transition-colors" />
    ),
    // Cover archetype: texture field. One coarse halftone screen, clean spot
    // overprint and a registration mark - the actual Riso tells.
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f5f0] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1.6px,transparent_1.7px)] bg-[size:11px_11px] opacity-30" />
        <div className="absolute left-6 top-7 w-[104px] h-[104px] rounded-full bg-[#ff8a00] opacity-80 mix-blend-multiply" />
        <div className="absolute left-[74px] top-[52px] w-[104px] h-[104px] rounded-full bg-[#ff6b9d] opacity-75 mix-blend-multiply" />
        <div className="absolute right-8 top-9 w-[86px] h-[112px] bg-[#22c55e] opacity-70 mix-blend-multiply [clip-path:polygon(10%_0,100%_6%,92%_100%,0_92%)]" />
        <div className="absolute right-[22px] top-[52px] w-[86px] h-[112px] bg-[#2563eb] opacity-55 mix-blend-multiply [clip-path:polygon(10%_0,100%_6%,92%_100%,0_92%)]" />
        <div className="absolute right-4 top-4">
          <div className="relative w-4 h-4">
            <div className="absolute left-1/2 top-0 h-4 w-[1px] -translate-x-1/2 bg-[#ff6b9d]" />
            <div className="absolute top-1/2 left-0 w-4 h-[1px] -translate-y-1/2 bg-[#2563eb]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

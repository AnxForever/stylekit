import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f2ede4] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-6 left-6 w-16 h-[1px] bg-[#3a3a3a]/20" />
        <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-[#8b6f4e]/20" />
        <div className="relative w-full max-w-[200px]">
          <div className="bg-[#f2ede4] border border-[#3a3a3a]/15 p-4">
            <div className="font-light text-sm text-[#3a3a3a] mb-2 tracking-widest">WABI-SABI</div>
            <div className="w-12 h-[1px] bg-[#8b6f4e]/40 mb-3" />
            <p className="text-xs text-[#3a3a3a]/40 mb-3 font-light">Imperfect Beauty</p>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-[#8a9a7b]/60" />
              <div className="w-6 h-6 rounded-full bg-[#b5a78c]/60" />
              <div className="w-6 h-6 rounded-full bg-[#8b6f4e]/60" />
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

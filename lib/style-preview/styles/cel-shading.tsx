import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#fafaf5] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="relative w-full max-w-[200px]">
          <div className="bg-white border-[3px] border-[#1a1a2e] rounded-none p-4 shadow-[4px_4px_0px_0px_#1a1a2e]">
            <div className="font-black text-sm text-[#1a1a2e] mb-2 tracking-wide">CEL SHADING</div>
            <p className="text-xs text-[#1a1a2e]/60 mb-3">Bold & Flat</p>
            <div className="flex gap-2">
              <div className="flex-1 h-6 bg-[#e63946] border-2 border-[#1a1a2e]" />
              <div className="flex-1 h-6 bg-[#4ea8de] border-2 border-[#1a1a2e]" />
              <div className="flex-1 h-6 bg-[#2ecc71] border-2 border-[#1a1a2e]" />
              <div className="flex-1 h-6 bg-[#f1c40f] border-2 border-[#1a1a2e]" />
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

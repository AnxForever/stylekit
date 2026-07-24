import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#0d0b14] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#c9a74e]/30 bg-[#1a1528] p-4 rounded-lg shadow-[0_0_15px_rgba(201,167,78,0.1)]">
          <div className="text-[#c9a74e] text-sm font-serif mb-2">Witchcore</div>
          <div className="h-px bg-[#c9a74e]/20 mb-3" />
          <p className="text-[#c9a74e]/50 text-xs font-serif mb-3">Dark mystical arts</p>
          <div className="text-[#c9a74e]/60 text-xs">&#x2606; &#x263D; &#x2606;</div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

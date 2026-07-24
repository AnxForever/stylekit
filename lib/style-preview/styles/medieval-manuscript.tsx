import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f0e6d0] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#c9a74e]/40 bg-[#f7f0e0] p-4">
          <div className="text-[#8b1a1a] text-sm font-serif mb-2">Medieval Script</div>
          <div className="h-px bg-[#c9a74e]/50 mb-3" />
          <p className="text-[#8b1a1a]/60 text-xs font-serif mb-3">Illuminated manuscripts</p>
          <div className="w-6 h-6 border border-[#c9a74e] flex items-center justify-center text-[#c9a74e] text-xs">M</div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

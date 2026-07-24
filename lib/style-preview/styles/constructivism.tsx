import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f2e8d5] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] bg-[#1a1a1a] p-4">
          <div className="text-[#cc0000] text-sm font-black uppercase tracking-wider mb-2 -skew-x-6">Constructivism</div>
          <div className="h-0.5 bg-[#cc0000] mb-3" />
          <p className="text-[#f2e8d5]/80 text-xs mb-3">Revolutionary design</p>
          <div className="bg-[#cc0000] text-[#f2e8d5] text-xs font-bold px-3 py-1.5 inline-block -skew-x-3">ACTION</div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

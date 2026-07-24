import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#1c1c1e] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] bg-[#2a2a2e] p-4 shadow-[4px_4px_0px_0px_rgba(255,45,85,0.6)]">
          <div className="text-[#ff2d55] text-sm font-black -skew-x-3 mb-2">GRAFFITI</div>
          <p className="text-[#00ff88]/70 text-xs mb-3">Street art vibes</p>
          <div className="flex gap-1">
            <div className="flex-1 h-1.5 bg-[#ff2d55]" />
            <div className="flex-1 h-1.5 bg-[#00ff88]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#1a1225] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#d4a5e3]/30 bg-[#2d1b3d] p-4 rounded-lg shadow-[0_0_15px_rgba(212,165,227,0.15)]">
          <div className="text-[#d4a5e3] text-sm font-medium mb-2">Pastel Goth</div>
          <p className="text-[#d4a5e3]/50 text-xs mb-3">Dark meets pastel</p>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-[#d4a5e3]/40" />
            <div className="w-3 h-3 rounded-full bg-[#b8e6c8]/40" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

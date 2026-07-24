import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#2c1810] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-4 border-[#f0c75e] bg-[#3a2218] p-4">
          <div className="text-[#f0c75e] text-sm font-bold mb-2">African Textile</div>
          <div className="flex gap-0.5 mb-3">
            <div className="flex-1 h-1 bg-[#c4501f]" />
            <div className="flex-1 h-1 bg-[#f0c75e]" />
            <div className="flex-1 h-1 bg-[#c4501f]" />
          </div>
          <p className="text-[#f0c75e]/70 text-xs">Bold woven patterns</p>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

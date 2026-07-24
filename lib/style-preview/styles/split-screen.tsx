import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      // Modern Gradient 风格
      <div className="w-full h-full flex">
        <div className="flex-1 bg-zinc-900 flex items-center justify-center p-3 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30" />
          <div className="text-white text-center relative z-10">
            <div className="text-xs font-bold mb-1">LEFT</div>
            <div className="text-[10px] text-white/60">Dark Side</div>
          </div>
        </div>
        <div className="flex-1 bg-white flex items-center justify-center p-3">
          <div className="text-zinc-900 text-center">
            <div className="text-xs font-bold mb-1">RIGHT</div>
            <div className="text-[10px] text-zinc-500">Light Side</div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

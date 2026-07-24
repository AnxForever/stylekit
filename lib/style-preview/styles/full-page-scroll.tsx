import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      // Modern Gradient 风格 - 渐变色
      <div className="w-full h-full flex flex-col relative">
        <div className="flex-1 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 flex items-center justify-center border-b border-white/20">
          <div className="text-white text-center">
            <div className="text-xs font-bold">SECTION 1</div>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-fuchsia-600 via-pink-500 to-orange-400 flex items-center justify-center border-b border-white/20">
          <div className="text-white text-center">
            <div className="text-xs font-bold">SECTION 2</div>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-cyan-600 via-blue-600 to-violet-700 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-xs font-bold">SECTION 3</div>
          </div>
        </div>
        {/* Navigation dots */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

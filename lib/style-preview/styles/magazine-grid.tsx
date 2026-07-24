import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      // Editorial 风格 - 杂志编排
      <div className="w-full h-full bg-[#fafafa] p-2">
        <div className="grid grid-cols-4 gap-1.5 h-full">
          {/* Featured - 2x2 */}
          <div className="col-span-2 row-span-2 bg-[#0a0a0a] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e63946]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-[#e63946] text-white text-[8px] px-1.5 py-0.5 inline-block mb-1">Featured</div>
              <div className="text-white text-[10px] font-serif italic">Main Article</div>
            </div>
          </div>
          {/* Small articles */}
          <div className="bg-gradient-to-br from-gray-700 to-gray-900" />
          <div className="bg-gradient-to-br from-gray-600 to-gray-800" />
          <div className="bg-gradient-to-br from-gray-500 to-gray-700" />
          <div className="bg-gradient-to-br from-gray-600 to-gray-800" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

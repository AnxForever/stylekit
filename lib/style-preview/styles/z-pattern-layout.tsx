import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-white flex flex-col p-2">
        {/* Z的第一笔 - Logo(左) → CTA(右) */}
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="w-10 h-3 bg-[#0f172a] rounded" />
          <div className="w-12 h-4 bg-[#6366f1] rounded-md" />
        </div>
        {/* Z的对角线 - 核心内容 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-2">
            <div className="w-24 h-4 bg-[#0f172a] rounded mx-auto mb-2" />
            <div className="w-20 h-2 bg-gray-200 rounded mx-auto mb-3" />
            <div className="flex gap-1 justify-center">
              <div className="w-14 h-5 bg-[#6366f1] rounded-lg" />
              <div className="w-12 h-5 border border-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
        {/* Z的第二笔 - 信任(左) → CTA(右) */}
        <div className="flex items-center justify-between px-1 pt-2 border-t border-gray-100">
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="w-4 h-4 bg-gray-200 rounded" />
          </div>
          <div className="w-14 h-4 bg-[#0f172a] rounded-md" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

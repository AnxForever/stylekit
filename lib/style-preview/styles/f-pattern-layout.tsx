import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f8f9fa] flex flex-col p-2">
        {/* F的第一笔 - 顶部横条 */}
        <div className="h-8 bg-white border-b border-gray-200 mb-2 flex items-center px-2">
          <div className="w-12 h-3 bg-[#1a1a2e] rounded" />
          <div className="ml-auto flex gap-1">
            <div className="w-6 h-2 bg-gray-200 rounded" />
            <div className="w-6 h-2 bg-gray-200 rounded" />
          </div>
        </div>
        {/* F的第二笔 - 特色内容 */}
        <div className="h-10 bg-white rounded-lg mb-2 p-2 shadow-sm">
          <div className="w-8 h-1.5 bg-[#e63946] rounded mb-1" />
          <div className="w-16 h-2 bg-[#1a1a2e] rounded" />
        </div>
        {/* F的竖线 - 左侧内容列表 */}
        <div className="flex-1 flex gap-2">
          <div className="flex-1 space-y-1.5">
            <div className="h-8 bg-white rounded-lg shadow-sm flex items-center p-2 gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded" />
              <div className="flex-1">
                <div className="w-12 h-1.5 bg-[#1a1a2e] rounded mb-1" />
                <div className="w-16 h-1 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-8 bg-white rounded-lg shadow-sm flex items-center p-2 gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded" />
              <div className="flex-1">
                <div className="w-10 h-1.5 bg-[#1a1a2e] rounded mb-1" />
                <div className="w-14 h-1 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
          <div className="w-12 bg-white rounded-lg shadow-sm p-1.5">
            <div className="text-[6px] text-gray-400 mb-1">Sidebar</div>
            <div className="space-y-1">
              <div className="w-full h-1 bg-gray-200 rounded" />
              <div className="w-3/4 h-1 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

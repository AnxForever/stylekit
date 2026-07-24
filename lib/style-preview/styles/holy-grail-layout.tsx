import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f1f5f9] flex flex-col">
        {/* Header */}
        <div className="h-6 bg-white border-b border-gray-200 flex items-center px-2">
          <div className="w-10 h-2 bg-[#1e293b] rounded" />
          <div className="ml-auto flex gap-1">
            <div className="w-4 h-1.5 bg-gray-200 rounded" />
            <div className="w-4 h-1.5 bg-gray-200 rounded" />
          </div>
        </div>
        {/* 三列主体 */}
        <div className="flex-1 flex">
          {/* 左侧导航 */}
          <div className="w-10 bg-white border-r border-gray-200 p-1.5">
            <div className="space-y-1">
              <div className="h-2 bg-[#3b82f6]/20 rounded" />
              <div className="h-2 bg-gray-100 rounded" />
              <div className="h-2 bg-gray-100 rounded" />
            </div>
          </div>
          {/* 主内容区 */}
          <div className="flex-1 p-2">
            <div className="h-4 w-12 bg-[#1e293b] rounded mb-2" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 bg-white rounded shadow-sm" />
              <div className="h-8 bg-white rounded shadow-sm" />
            </div>
          </div>
          {/* 右侧边栏 */}
          <div className="w-10 bg-white border-l border-gray-200 p-1.5">
            <div className="text-[6px] text-gray-400 mb-1">Activity</div>
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-100 rounded" />
              <div className="h-1.5 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="h-5 bg-white border-t border-gray-200 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-200 rounded" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f9fafb] flex">
        {/* 深色侧边栏 */}
        <div className="w-12 bg-[#111827] flex flex-col p-1.5">
          <div className="w-5 h-1.5 bg-white/80 rounded mb-2" />
          <div className="space-y-1">
            <div className="h-2 bg-white/20 rounded" />
            <div className="h-2 bg-white/10 rounded" />
            <div className="h-2 bg-white/10 rounded" />
          </div>
        </div>
        {/* 主区域 */}
        <div className="flex-1 flex flex-col">
          {/* 顶部工具栏 */}
          <div className="h-5 bg-white border-b border-gray-200 flex items-center px-2">
            <div className="w-8 h-1.5 bg-[#111827] rounded" />
            <div className="ml-auto w-4 h-4 bg-[#6366f1] rounded-full" />
          </div>
          {/* 内容区 */}
          <div className="flex-1 p-1.5">
            {/* KPI 卡片 */}
            <div className="grid grid-cols-4 gap-1 mb-1.5">
              <div className="bg-white rounded p-1 shadow-sm">
                <div className="text-[6px] text-gray-400">Rev</div>
                <div className="text-[8px] font-bold text-[#111827]">$48K</div>
                <div className="text-[6px] text-[#10b981]">+12%</div>
              </div>
              <div className="bg-white rounded p-1 shadow-sm">
                <div className="text-[6px] text-gray-400">Users</div>
                <div className="text-[8px] font-bold text-[#111827]">2.4K</div>
                <div className="text-[6px] text-[#10b981]">+5%</div>
              </div>
              <div className="bg-white rounded p-1 shadow-sm">
                <div className="text-[6px] text-gray-400">Orders</div>
                <div className="text-[8px] font-bold text-[#111827]">1.2K</div>
                <div className="text-[6px] text-[#ef4444]">-2%</div>
              </div>
              <div className="bg-white rounded p-1 shadow-sm">
                <div className="text-[6px] text-gray-400">Conv</div>
                <div className="text-[8px] font-bold text-[#111827]">3.6%</div>
                <div className="text-[6px] text-[#f59e0b]">+0.3</div>
              </div>
            </div>
            {/* 图表区 */}
            <div className="grid grid-cols-3 gap-1">
              <div className="col-span-2 bg-white rounded p-1.5 shadow-sm">
                <div className="text-[6px] text-gray-500 mb-1">Revenue Trend</div>
                <div className="h-10 bg-gray-50 rounded" />
              </div>
              <div className="bg-white rounded p-1.5 shadow-sm">
                <div className="text-[6px] text-gray-500 mb-1">Dist</div>
                <div className="h-10 bg-gray-50 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-4 py-2 bg-[#2eaadc] rounded-md text-white text-sm font-medium hover:bg-[#2997c9] transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-[#37352f] mb-2">Notion 卡片</h3>
        <p className="text-gray-600 text-sm">极简清爽的文档风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#37352f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2eaadc] focus:border-transparent transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex p-2">
        <div className="w-1/3 bg-[#f7f6f3] border-r border-gray-200 p-2">
          <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
          <div className="h-2 w-full bg-gray-100 rounded mb-1" />
          <div className="h-2 w-full bg-[#37352f]/10 rounded mb-1" />
          <div className="h-2 w-full bg-gray-100 rounded" />
        </div>
        <div className="flex-1 p-2">
          <div className="h-4 w-24 bg-[#37352f]/80 rounded mb-2" />
          <div className="h-2 w-full bg-gray-200 rounded mb-1" />
          <div className="h-2 w-3/4 bg-gray-200 rounded mb-3" />
          <div className="flex gap-1">
            <span className="px-1.5 py-0.5 bg-blue-50 text-[8px] text-[#2eaadc] rounded">Tag</span>
            <span className="px-1.5 py-0.5 bg-green-50 text-[8px] text-[#0f7b6c] rounded">Tag</span>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#4a9d9a] text-white font-medium rounded-xl shadow-lg shadow-[#4a9d9a]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
        View Report
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#faf8f5] rounded-2xl shadow-xl shadow-black/8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-500 text-sm">Views</span>
          <span className="w-2 h-2 rounded-full bg-[#4a9d9a]" />
        </div>
        <p className="text-3xl font-bold text-gray-800 mb-1">27.6m</p>
        <p className="text-sm text-[#4a9d9a]">+12% from last month</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Search reports..."
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#d4a088] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-[#faf8f5] rounded-2xl p-4 shadow-xl shadow-black/8 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-xs">Views</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9d9a]" />
            </div>
            <p className="text-xl font-bold text-gray-800 mb-0.5">27.6m</p>
            <p className="text-[10px] text-[#4a9d9a]">+12%</p>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#4a9d9a] rounded-lg py-1.5 text-center">
              <span className="text-white text-xs font-medium">Stats</span>
            </div>
            <div className="flex-1 bg-[#faf8f5] rounded-lg py-1.5 text-center shadow-sm">
              <span className="text-gray-600 text-xs">Export</span>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

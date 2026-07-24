import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      // Corporate Clean 风格 - 专业企业风格
      <div className="w-full h-full bg-slate-50 flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#1e3a5f] flex flex-col p-2">
          <div className="w-6 h-1.5 bg-blue-500 rounded mb-3" />
          <div className="space-y-1.5">
            <div className="h-2 bg-blue-600 rounded w-full" />
            <div className="h-2 bg-white/10 rounded w-3/4" />
            <div className="h-2 bg-white/10 rounded w-3/4" />
          </div>
          <div className="mt-auto">
            <div className="w-4 h-4 bg-blue-400/30 rounded-full" />
          </div>
        </div>
        {/* Main content */}
        <div className="flex-1 p-2">
          <div className="h-2 bg-slate-300 rounded w-1/2 mb-2" />
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-8 bg-white rounded-xl shadow-sm border border-slate-200" />
            <div className="h-8 bg-white rounded-xl shadow-sm border border-slate-200" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

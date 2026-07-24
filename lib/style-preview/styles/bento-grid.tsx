import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-800 transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white">
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
        <h3 className="font-bold text-lg mb-2">Bento Card</h3>
        <p className="text-sm text-white/80">便当盒布局风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-zinc-50 flex items-center justify-center p-3">
        <div className="w-full max-w-[220px] grid grid-cols-3 gap-1.5">
          {/* 大卡片 2x2 */}
          <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3 text-white">
            <div className="font-bold text-sm mb-1">Bento</div>
            <p className="text-[10px] text-white/70">不规则网格</p>
          </div>
          {/* 小卡片 */}
          <div className="bg-orange-100 rounded-lg p-2 flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-400 rounded-md" />
          </div>
          <div className="bg-green-100 rounded-lg p-2 flex items-center justify-center">
            <div className="w-4 h-4 bg-green-400 rounded-md" />
          </div>
          {/* 宽卡片 */}
          <div className="col-span-2 bg-zinc-100 rounded-lg p-2">
            <div className="text-[10px] font-medium text-zinc-600">Wide Card</div>
          </div>
          <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-400 rounded-md" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

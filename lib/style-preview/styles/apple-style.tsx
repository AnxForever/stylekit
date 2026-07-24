import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#0071e3] rounded-full text-white font-medium hover:bg-[#0077ed] transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <h3 className="text-xl font-semibold tracking-tight text-black mb-2">Apple 卡片</h3>
        <p className="text-gray-500">极致简约的高端设计</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f5f7] flex items-center justify-center p-3">
        <div className="w-full max-w-[180px] text-center">
          <div className="bg-white rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)] mb-3">
            <div className="w-12 h-12 bg-[#f5f5f7] rounded-xl mx-auto mb-2" />
            <div className="text-black font-semibold text-sm">Product</div>
            <div className="text-gray-500 text-[10px]">From $999</div>
          </div>
          <button className="px-4 py-1.5 bg-[#0071e3] rounded-full text-white text-xs font-medium">
            Buy
          </button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)] hover:shadow-[0_4px_8px_rgba(99,91,255,0.3),0_8px_16px_rgba(99,91,255,0.2)] hover:-translate-y-0.5 transition-all duration-200">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Stripe 卡片</h3>
        <p className="text-gray-600">专业的金融科技风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f6f9fc] flex items-center justify-center p-3 relative">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(to right, rgba(99,91,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,91,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }} />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-white rounded-xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            <div className="w-8 h-8 bg-gradient-to-br from-[#635bff] to-[#00d4ff] rounded-lg mb-3" />
            <div className="text-[#0a2540] font-semibold text-sm mb-1">Payments</div>
            <p className="text-gray-500 text-[10px] mb-3">Accept payments online</p>
            <button className="w-full py-2 bg-[#635bff] rounded-lg text-white text-xs font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

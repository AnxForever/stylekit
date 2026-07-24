import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ff004d] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white border-4 border-[#1a1c2c] rounded-none shadow-[4px_4px_0_#1a1c2c]">
        <h3 className="text-xl font-bold uppercase text-[#1a1c2c] mb-2">像素卡片</h3>
        <p className="text-[#5f574f] uppercase text-sm">复古 8-bit 游戏风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border-4 border-[#1a1c2c] rounded-none text-[#1a1c2c] placeholder-[#8b8680] font-mono uppercase focus:outline-none focus:shadow-[inset_0_0_0_2px_#29adff] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#1a1c2c] flex items-center justify-center p-3">
        <div className="w-full max-w-[180px]">
          <div className="bg-white border-4 border-[#1a1c2c] p-3 shadow-[4px_4px_0_#ff004d]">
            <div className="text-[#1a1c2c] font-bold text-sm uppercase mb-2">Pixel</div>
            <p className="text-[#5f574f] text-[10px] uppercase mb-3">8-bit style</p>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-[#ff004d] border-2 border-[#1a1c2c]" />
              <div className="w-4 h-4 bg-[#00e436] border-2 border-[#1a1c2c]" />
              <div className="w-4 h-4 bg-[#29adff] border-2 border-[#1a1c2c]" />
              <div className="w-4 h-4 bg-[#ffec27] border-2 border-[#1a1c2c]" />
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

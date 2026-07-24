import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="relative px-6 py-3 bg-yellow-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
        <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
        点击按钮
      </button>
    ),
    card: () => (
      <div className="relative p-6 bg-pink-300 border-4 border-black shadow-[8px_8px_0px_#000]">
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full border-2 border-black" />
        <div className="absolute -bottom-2 -right-2 w-0 h-0 border-l-[15px] border-l-transparent border-b-[25px] border-b-cyan-400 border-r-[15px] border-r-transparent" />
        <h3 className="text-xl font-black text-black uppercase mb-2">孟菲斯卡片</h3>
        <p className="text-black/70 font-medium">大胆有趣的设计</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold placeholder-gray-400 shadow-[4px_4px_0px_#48dbfb] focus:shadow-[4px_4px_0px_#ff6b6b] focus:outline-none transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-yellow-300 via-pink-300 to-cyan-300 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-2 left-2 w-6 h-6 bg-red-500 rounded-full border-2 border-black" />
        <div className="absolute bottom-3 right-3 w-5 h-5 bg-blue-500 border-2 border-black rotate-45" />
        <div className="absolute top-1/3 right-4 w-0 h-0 border-l-[10px] border-l-transparent border-b-[16px] border-b-green-400 border-r-[10px] border-r-transparent" />
        <div className="relative w-full max-w-[180px]">
          <div className="relative bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000]">
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-black" />
            <div className="font-black text-sm text-black uppercase mb-2">MEMPHIS</div>
            <p className="text-gray-600 text-[10px] mb-3">大胆撞色风格</p>
            <button className="w-full py-2 bg-pink-400 border-2 border-black text-black text-xs font-black uppercase shadow-[3px_3px_0px_#000]">
              Fun!
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

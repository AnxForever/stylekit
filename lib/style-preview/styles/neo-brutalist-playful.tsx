import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#fbbf24] text-black font-black rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:rotate-1 transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#c4b5fd] rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
        <h3 className="font-black text-xl mb-2">Playful Card</h3>
        <p className="text-sm">活泼有趣的设计风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-[#fef3c7] rounded-full border-[3px] border-black font-mono focus:outline-none focus:rotate-1 transition-transform"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#4ecdc4] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] rotate-[-1deg]">
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,107,107,1)] p-4 rotate-[2deg]">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-6 w-6 bg-[#ff6b6b] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-3" />
              <div className="h-6 w-6 bg-[#ffe66d] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -rotate-3" />
              <div className="h-6 w-6 bg-[#4ecdc4] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-6" />
            </div>
            <div className="font-black text-base mb-2">PLAYFUL!</div>
            <p className="text-xs mb-3 text-gray-600">有趣的设计</p>
            <button className="bg-[#ffe66d] text-black text-xs font-black px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
              Fun
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

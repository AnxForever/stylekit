import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ff006e] text-white font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#ccff00] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="font-black text-xl mb-2">Neo-Brutalist Card</h3>
        <p className="font-mono text-sm">大胆、直接、有冲击力的设计风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border-4 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#ccff00] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4">
            <div className="font-black text-base mb-3">BRUTAL</div>
            <p className="font-mono text-xs mb-3 text-gray-600">大胆直接的设计</p>
            <button className="bg-[#ff006e] text-white text-xs font-black px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              ACTION
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

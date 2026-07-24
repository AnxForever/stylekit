import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#a855f7] text-white font-bold rounded-2xl border-2 border-black/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-black/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
        <h3 className="font-bold text-xl mb-2">Soft Brutalist Card</h3>
        <p className="text-sm text-gray-600">柔和的新粗野主义风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white rounded-xl border-2 border-black/20 focus:outline-none focus:border-purple-400 transition-colors"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-black/10 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)] p-4">
            <div className="font-bold text-base mb-3 text-gray-800">Soft Card</div>
            <p className="text-xs mb-3 text-gray-500">柔和的野兽派</p>
            <button className="bg-[#a855f7] text-white text-xs font-bold px-4 py-2 rounded-xl border-2 border-black/15 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
              Button
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

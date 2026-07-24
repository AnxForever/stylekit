import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#e0e5ec] text-zinc-600 font-medium rounded-xl shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] transition-shadow">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#e0e5ec] rounded-2xl shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]">
        <h3 className="font-semibold text-lg mb-2 text-zinc-700">Neumorphism Card</h3>
        <p className="text-sm text-zinc-500">柔和的新拟态风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-[#e0e5ec] rounded-xl shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] text-zinc-600 focus:outline-none"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#e0e5ec] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-[#e0e5ec] rounded-2xl shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-4">
            <div className="font-semibold text-base mb-2 text-zinc-700">Neumorphism</div>
            <p className="text-xs text-zinc-500 mb-3">柔和立体的界面</p>
            <div className="flex gap-2">
              <button className="bg-[#e0e5ec] text-xs font-medium text-zinc-600 px-4 py-2 rounded-lg shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]">
                Button
              </button>
              <div className="w-8 h-8 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#6d5dfc]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

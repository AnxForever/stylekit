import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]">
        <h3 className="text-xl font-bold text-amber-800 mb-2">粘土卡片</h3>
        <p className="text-amber-700">柔软的 3D 立体效果</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-6 py-4 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.9),0_0_0_4px_rgba(248,180,217,0.3)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-amber-100 via-pink-100 to-purple-100 flex items-center justify-center p-3">
        <div className="w-full max-w-[180px]">
          <div className="bg-gradient-to-br from-white to-pink-50 rounded-[24px] p-4 shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.6),inset_-2px_-2px_4px_rgba(0,0,0,0.05)]">
            <div className="text-pink-600 font-bold text-sm mb-2">Clay Card</div>
            <p className="text-pink-500 text-[10px] mb-3">柔软的粘土质感</p>
            <button className="w-full py-2 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white text-xs font-bold shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]">
              Button
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

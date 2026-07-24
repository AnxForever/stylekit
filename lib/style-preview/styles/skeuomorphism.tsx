import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-8 py-4 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 border border-gray-400 rounded-lg text-gray-700 font-semibold shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.1)] hover:from-gray-200 hover:via-gray-300 hover:to-gray-400 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-[1px] transition-all duration-100">
        Press Me
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-300 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)] relative overflow-hidden">
        <h3 className="text-xl font-bold text-amber-900 mb-2">Leather Card</h3>
        <p className="text-amber-800">Realistic texture and depth</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Type here..."
        className="w-full px-4 py-3 bg-gradient-to-b from-white to-gray-100 border border-gray-300 rounded-lg text-gray-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_0_8px_rgba(59,130,246,0.3)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400 flex items-center justify-center p-3 relative">
        <div className="relative w-full max-w-[180px]">
          <div className="bg-gradient-to-b from-white/90 to-gray-100/90 rounded-2xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50">
            <div className="font-bold text-sm text-gray-800 mb-2" style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>Skeuomorphism</div>
            <p className="text-xs text-gray-600 mb-3">Realistic textures</p>
            <button className="w-full py-2 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg text-white text-xs font-bold shadow-[0_3px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]">
              Button
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

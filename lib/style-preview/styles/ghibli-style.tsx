import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-8 py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full border-2 border-[#5a9a8a]/30 shadow-[0_4px_14px_rgba(124,185,168,0.4)] hover:shadow-[0_6px_20px_rgba(124,185,168,0.5)] hover:-translate-y-0.5 transition-all duration-300">
        Begin Journey
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-[#85cdca] to-[#7cb9a8] rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#5a4a3a] mb-2">Sky Garden</h3>
        <p className="text-[#7a6a5a]">Where dreams float among the clouds</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Write your story..."
        className="w-full px-5 py-4 bg-[#f4e4bc]/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#7cb9a8] focus:bg-[#f4e4bc]/80 transition-all duration-300"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-b from-[#87ceeb] via-[#b4e4f5] to-[#f4e4bc] flex items-center justify-center p-3 relative overflow-hidden">
        {/* Clouds */}
        <div className="absolute top-3 left-2 w-16 h-8 bg-white/50 rounded-full blur-sm" />
        <div className="absolute top-6 right-4 w-12 h-6 bg-white/40 rounded-full blur-sm" />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl p-4 border border-[#d4c49a]/50 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            <div className="w-10 h-10 bg-gradient-to-br from-[#85cdca] to-[#7cb9a8] rounded-full flex items-center justify-center mb-3">
              <div className="w-5 h-5 bg-white/80 rounded-full" />
            </div>
            <div className="font-semibold text-sm text-[#5a4a3a] mb-1">Ghibli Style</div>
            <p className="text-[10px] text-[#7a6a5a] mb-3">Warm and dreamy</p>
            <button className="w-full py-2 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white text-xs font-medium rounded-full shadow-[0_3px_10px_rgba(124,185,168,0.4)]">
              Adventure
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

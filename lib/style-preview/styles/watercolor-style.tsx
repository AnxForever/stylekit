import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-8 py-4 bg-gradient-to-r from-[#4a6fa5]/80 to-[#85cdca]/80 rounded-full text-white font-serif shadow-lg shadow-[#4a6fa5]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        Explore
      </button>
    ),
    card: () => (
      <div className="p-8 bg-gradient-to-br from-[#e8a87c]/20 via-white to-[#85cdca]/20 rounded-3xl shadow-lg shadow-[#4a6fa5]/10 border border-[#4a6fa5]/10">
        <h3 className="text-lg font-serif text-[#4a6fa5] mb-2">Watercolor Card</h3>
        <p className="text-[#6b7280] text-sm">Colors flowing like water</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Write here..."
        className="w-full px-5 py-4 bg-white/60 border border-[#4a6fa5]/20 rounded-2xl text-[#4a6fa5] placeholder-[#4a6fa5]/40 font-serif focus:outline-none focus:border-[#4a6fa5]/40 focus:bg-white/80 transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#faf8f5] flex items-center justify-center p-3 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-[#e8a87c]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#85cdca]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#c38d94]/10 rounded-full blur-2xl" />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-gradient-to-br from-[#e8a87c]/15 via-white/80 to-[#85cdca]/15 rounded-3xl p-4 border border-[#4a6fa5]/10 shadow-lg shadow-[#4a6fa5]/10">
            <div className="font-serif italic text-sm text-[#4a6fa5] mb-2">Watercolor</div>
            <p className="text-[#6b7280] text-[10px] mb-3">Soft flowing colors</p>
            <button className="w-full py-2 bg-gradient-to-r from-[#4a6fa5]/70 to-[#85cdca]/70 text-white text-xs font-serif rounded-full">
              Paint
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

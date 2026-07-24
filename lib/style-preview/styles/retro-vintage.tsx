import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#8b4513] text-[#f5e6d3] border-2 border-[#5c2e0a] font-serif uppercase tracking-widest text-sm hover:bg-[#5c2e0a] transition-colors duration-200">
        Discover More
      </button>
    ),
    card: () => (
      <div className="bg-[#f5e6d3] border-2 border-[#8b4513] p-8 relative">
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8b4513]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8b4513]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8b4513]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8b4513]" />
        <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/60">Chapter</span>
        <h3 className="text-2xl font-serif text-[#8b4513] mt-2 mb-4">Retro Vintage</h3>
        <p className="text-[#8b4513]/80 leading-relaxed font-serif">复古怀旧的设计风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Enter your name..."
        className="w-full px-4 py-3 bg-transparent border-2 border-[#8b4513] text-[#8b4513] font-serif placeholder:text-[#8b4513]/40 focus:outline-none focus:bg-[#8b4513]/5 transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5e6d3] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="border-2 border-[#8b4513] p-4 relative">
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#8b4513]" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#8b4513]" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#8b4513]" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#8b4513]" />
            <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#8b4513]/60">Vintage</span>
            <div className="font-serif text-lg text-[#8b4513] mt-1 mb-2">Retro</div>
            <p className="text-xs text-[#8b4513]/70 font-serif mb-3">复古怀旧风格</p>
            <button className="bg-[#8b4513] text-[#f5e6d3] text-[10px] font-serif uppercase tracking-widest px-3 py-1.5 border-2 border-[#5c2e0a]">
              Explore
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

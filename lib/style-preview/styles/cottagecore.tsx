import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#5a8f5a] text-[#f5f0e1] font-serif tracking-wide border border-[#8b7355] rounded-lg hover:bg-[#f5d75f] hover:text-[#5a8f5a] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#5a8f5a] rounded-lg">
        <h3 className="font-serif text-xl text-[#5a8f5a] mb-2">Cottagecore Card</h3>
        <p className="text-sm text-[#8b7355]">Pastoral charm</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Garden notes..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#5a8f5a] rounded-lg text-[#5a8f5a] placeholder-[#5a8f5a]/40 focus:outline-none focus:border-[#8b7355] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#5a8f5a] rounded-lg p-4 bg-[#f5f0e1]">
          <div className="font-serif text-base text-[#5a8f5a] mb-2">Cottagecore</div>
          <p className="text-xs text-[#8b7355] mb-3">Simple living</p>
          <button className="bg-[#5a8f5a] text-[#f5f0e1] text-xs px-4 py-2 rounded-lg border border-[#8b7355]">Bloom</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

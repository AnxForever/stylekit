import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#4a1a4a] text-[#c9a2c9] font-serif tracking-wide border border-[#8b1a2a] rounded hover:bg-[#8b1a2a] hover:text-[#e5e5e5] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#e5e5e5] border border-[#4a1a4a] rounded">
        <h3 className="font-serif text-xl text-[#4a1a4a] mb-2">Gothic Lolita Card</h3>
        <p className="text-sm text-[#8b1a2a]">Dark romantic elegance</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Whisper..." className="w-full px-4 py-3 bg-[#e5e5e5] border border-[#4a1a4a] rounded text-[#4a1a4a] placeholder-[#4a1a4a]/40 focus:outline-none focus:border-[#8b1a2a] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#e5e5e5] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#4a1a4a] rounded p-4 bg-[#e5e5e5]">
          <div className="font-serif text-base text-[#4a1a4a] mb-2">Gothic Lolita</div>
          <p className="text-xs text-[#8b1a2a] mb-3">Lace and shadow</p>
          <button className="bg-[#4a1a4a] text-[#c9a2c9] text-xs px-4 py-2 rounded border border-[#8b1a2a]">Enter</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

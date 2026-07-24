import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#e74c3c] text-white font-bold tracking-wide border-2 border-[#2d2d2d] rounded hover:bg-[#3498db] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded rotate-1">
        <h3 className="font-bold text-xl text-[#2d2d2d] mb-2">Collage Card</h3>
        <p className="text-sm text-[#9b59b6]">Cut and paste</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Paste here..." className="w-full px-4 py-3 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded text-[#2d2d2d] placeholder-[#2d2d2d]/40 focus:outline-none focus:border-[#e74c3c] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e8] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-[#2d2d2d] rounded p-4 bg-[#f5f0e8] rotate-1">
          <div className="font-bold text-base text-[#2d2d2d] mb-2">Collage</div>
          <p className="text-xs text-[#9b59b6] mb-3">Mixed media</p>
          <button className="bg-[#e74c3c] text-white text-xs px-4 py-2 rounded border border-[#2d2d2d]">Clip</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

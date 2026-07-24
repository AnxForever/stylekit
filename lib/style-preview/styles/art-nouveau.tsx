import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#2d5016] text-[#f5f0e1] font-serif tracking-wide border border-[#c9a227] rounded hover:bg-[#c9a227] hover:text-[#2d5016] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#c9a227] rounded">
        <h3 className="font-serif text-xl text-[#2d5016] mb-2">Art Nouveau Card</h3>
        <p className="text-sm text-[#2d5016]/70">Organic elegance</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Type here..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#c9a227] rounded text-[#2d5016] placeholder-[#2d5016]/40 focus:outline-none focus:border-[#2d5016] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#c9a227] rounded p-4 bg-[#f5f0e1]">
          <div className="font-serif text-base text-[#2d5016] mb-2">Art Nouveau</div>
          <p className="text-xs text-[#2d5016]/60 mb-3">Organic curves</p>
          <button className="bg-[#2d5016] text-[#f5f0e1] text-xs px-4 py-2 rounded border border-[#c9a227]">Action</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

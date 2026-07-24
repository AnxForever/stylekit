import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#3d2b1f] text-[#f5f0e1] font-serif tracking-wide border border-[#8b7355] rounded hover:bg-[#6b4c3b] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#8b7355] rounded">
        <h3 className="font-serif text-xl text-[#3d2b1f] mb-2">Dark Academia Card</h3>
        <p className="text-sm text-[#3d2b1f]/70">Classical knowledge</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Search texts..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#8b7355] rounded text-[#3d2b1f] placeholder-[#3d2b1f]/40 focus:outline-none focus:border-[#3d2b1f] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#8b7355] rounded p-4 bg-[#f5f0e1]">
          <div className="font-serif text-base text-[#3d2b1f] mb-2">Dark Academia</div>
          <p className="text-xs text-[#3d2b1f]/60 mb-3">Scholar aesthetics</p>
          <button className="bg-[#3d2b1f] text-[#f5f0e1] text-xs px-4 py-2 rounded border border-[#8b7355]">Read</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#e8a87c] text-[#f5f0e1] font-serif tracking-wide rounded hover:bg-[#c0392b] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#e8a87c] rounded">
        <h3 className="font-serif text-xl text-[#2c3e50] mb-2">Impressionist Card</h3>
        <p className="text-sm text-[#e8a87c]">Brushstroke textures</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Paint words..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#e8a87c] rounded text-[#2c3e50] placeholder-[#2c3e50]/40 focus:outline-none focus:border-[#c0392b] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#e8a87c] rounded p-4 bg-[#f5f0e1]">
          <div className="font-serif text-base text-[#2c3e50] mb-2">Impressionist</div>
          <p className="text-xs text-[#e8a87c] mb-3">Oil on canvas</p>
          <button className="bg-[#e8a87c] text-[#f5f0e1] text-xs px-4 py-2 rounded">Create</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

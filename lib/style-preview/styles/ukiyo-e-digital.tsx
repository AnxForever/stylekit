import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1a3055] text-[#f5f0e1] font-serif tracking-wide border border-[#d4553a] rounded hover:bg-[#d4553a] hover:text-[#f5f0e1] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#1a3055] rounded">
        <h3 className="font-serif text-xl text-[#1a3055] mb-2">Ukiyo-e Card</h3>
        <p className="text-sm text-[#1a3055]/70">Digital woodblock</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Type here..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#1a3055] rounded text-[#1a3055] placeholder-[#1a3055]/40 focus:outline-none focus:border-[#d4553a] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#1a3055] rounded p-4 bg-[#f5f0e1]">
          <div className="font-serif text-base text-[#1a3055] mb-2">Ukiyo-e</div>
          <p className="text-xs text-[#1a3055]/60 mb-3">Floating world</p>
          <button className="bg-[#d4553a] text-[#f5f0e1] text-xs px-4 py-2 rounded">Action</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1a1a3e] text-[#f0ece4] font-serif tracking-wide border border-[#7b68a8] rounded-lg hover:bg-[#7b68a8] hover:text-[#f0ece4] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f0ece4] border border-[#7b68a8] rounded-lg">
        <h3 className="font-serif text-xl text-[#1a1a3e] mb-2">Surrealism Card</h3>
        <p className="text-sm text-[#1a1a3e]/70">Dream meets reality</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Enter dream..." className="w-full px-4 py-3 bg-[#f0ece4] border border-[#7b68a8] rounded-lg text-[#1a1a3e] placeholder-[#1a1a3e]/40 focus:outline-none focus:border-[#d4a574] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f0ece4] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#7b68a8] rounded-lg p-4 bg-[#f0ece4]">
          <div className="font-serif text-base text-[#1a1a3e] mb-2">Surrealism</div>
          <p className="text-xs text-[#1a1a3e]/60 mb-3">Beyond reality</p>
          <button className="bg-[#1a1a3e] text-[#f0ece4] text-xs px-4 py-2 rounded-lg border border-[#7b68a8]">Explore</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#d4553a] text-[#c9a227] font-bold tracking-wider border border-[#c9a227] hover:bg-[#a020f0] hover:text-[#00d4ff] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a0a] border border-[#d4553a]">
        <h3 className="font-bold text-xl text-[#d4553a] mb-2">Cyber Chinese Card</h3>
        <p className="text-sm text-[#00d4ff]">Eastern futurism</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Input..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a227] text-[#d4553a] placeholder-[#d4553a]/40 focus:outline-none focus:border-[#00d4ff] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#d4553a] p-4 bg-[#0a0a0a]">
          <div className="font-bold text-base text-[#d4553a] mb-2">Cyber Chinese</div>
          <p className="text-xs text-[#00d4ff] mb-3">Neon dynasty</p>
          <button className="bg-[#d4553a] text-[#c9a227] text-xs px-4 py-2 border border-[#c9a227]">Enter</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

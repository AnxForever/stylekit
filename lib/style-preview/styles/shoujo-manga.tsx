import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ffb7c5] text-white font-medium rounded-full hover:bg-[#c4b5fd] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#fff5f7] border border-[#ffb7c5] rounded-2xl">
        <h3 className="text-xl text-[#ffb7c5] mb-2">Shoujo Card</h3>
        <p className="text-sm text-[#c4b5fd]">Romantic sparkle</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Whisper..." className="w-full px-4 py-3 bg-[#fff5f7] border border-[#ffb7c5] rounded-full text-[#ffb7c5] placeholder-[#ffb7c5]/40 focus:outline-none focus:border-[#c4b5fd] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#fff5f7] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#ffb7c5] rounded-2xl p-4 bg-[#fff5f7]">
          <div className="text-base text-[#ffb7c5] mb-2">Shoujo</div>
          <p className="text-xs text-[#c4b5fd] mb-3">Petal dreams</p>
          <button className="bg-[#ffb7c5] text-white text-xs px-4 py-2 rounded-full">Love</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

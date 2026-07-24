import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#F9A8D4] text-white font-medium rounded-full shadow-sm hover:bg-[#F472B6] transition-all text-sm">
        Click me
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#FFF7ED] rounded-3xl border border-[#F9A8D4]/20 shadow-sm">
        <h3 className="text-[#F472B6] text-lg mb-2 font-medium">Kawaii Card</h3>
        <p className="text-[#D4A4A4] text-sm">Soft and gentle design</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Type something..."
        className="w-full px-4 py-3 bg-white rounded-2xl border border-[#F9A8D4]/30 text-[#6B5B6B] placeholder:text-[#F9A8D4]/50 focus:outline-none focus:border-[#F9A8D4] focus:ring-2 focus:ring-[#F9A8D4]/20"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#FFF7ED] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-white rounded-3xl border border-[#F9A8D4]/20 shadow-sm p-4">
            <div className="text-[#F472B6] text-sm font-medium mb-3">Kawaii</div>
            <p className="text-[#D4A4A4] text-xs mb-3">Soft and sweet</p>
            <button className="bg-[#F9A8D4] text-white text-xs font-medium px-4 py-2 rounded-full shadow-sm">
              Explore
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

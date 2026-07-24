import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-black text-white font-medium hover:bg-white hover:text-black border-2 border-black transition-colors duration-200">
        Get Started
      </button>
    ),
    card: () => (
      <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200 group">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300">Category</span>
        <h3 className="text-2xl font-bold mt-2 mb-4">Minimalist Card</h3>
        <p className="leading-relaxed">极简扁平，无阴影无渐变</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="your@email.com"
        className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="border-2 border-black p-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Minimal</span>
            <div className="font-bold text-lg mt-1 mb-3">Flat Design</div>
            <p className="text-xs text-gray-600 mb-4">极简扁平风格</p>
            <button className="bg-black text-white text-xs font-medium px-4 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors">
              Action
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

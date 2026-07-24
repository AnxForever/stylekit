import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-red-500 transition-colors duration-200">
        Explore
      </button>
    ),
    card: () => (
      <div className="relative bg-white border-4 border-black p-8 group">
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-500 rotate-45 group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-xs font-bold uppercase tracking-[0.3em]">01</span>
        <h3 className="text-3xl font-black uppercase mt-2 mb-4">Geometric</h3>
        <p className="text-gray-600 leading-relaxed">大胆的几何图形设计</p>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-black" />
      </div>
    ),
    input: () => (
      <input
        type="email"
        placeholder="YOUR@EMAIL.COM"
        className="w-full px-4 py-4 bg-white border-4 border-black text-black font-medium placeholder:text-gray-400 focus:outline-none focus:bg-yellow-300 transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] relative">
          <div className="border-4 border-black p-4 relative">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rotate-45" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">01</span>
            <div className="font-black text-xl uppercase mt-1 mb-2">Bold</div>
            <p className="text-xs text-gray-600 mb-3">几何大胆风格</p>
            <button className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2">
              View
            </button>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-600 transition-colors duration-200">
        Action
      </button>
    ),
    card: () => (
      <div className="p-8 bg-white border-l-4 border-black">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-2">Category</p>
        <h3 className="text-2xl font-bold text-black mb-4">Helvetica Neue</h3>
        <p className="text-gray-700 leading-relaxed">Clean, objective, rational design principles.</p>
      </div>
    ),
    input: () => (
      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-2">Email</label>
        <input
          type="text"
          placeholder="your@email.com"
          className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-black text-black focus:outline-none focus:border-red-600 transition-colors"
        />
      </div>
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-3">
        <div className="w-full max-w-[180px] grid grid-cols-8 gap-2">
          <div className="col-span-6">
            <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-gray-500 mb-1">International</p>
            <h3 className="text-xl font-bold text-black leading-none mb-2">Swiss<br/>Design</h3>
            <p className="text-[10px] text-gray-600 mb-3">Grid, typography, clarity.</p>
            <button className="px-3 py-1.5 bg-black text-white text-[10px] font-medium uppercase tracking-[0.15em] hover:bg-red-600 transition-colors">
              Explore
            </button>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <div className="w-8 h-8 bg-red-600" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

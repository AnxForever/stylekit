import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-4 py-2 bg-[#3a3a3c] text-white/90 rounded-lg text-sm font-medium hover:bg-[#48484a] active:opacity-80 transition-colors duration-200">
        Save Changes
      </button>
    ),
    card: () => (
      <div className="bg-[#2c2c2e] border border-white/8 rounded-xl p-6 hover:border-white/12 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-white/95 mb-2" style={{ fontFamily: "Georgia, serif" }}>macOS Vibrancy</h3>
        <p className="text-white/60 text-sm leading-relaxed">Native dark vibrancy style</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-3 py-2 bg-[#1c1c1e] border border-white/10 rounded-lg text-white/90 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/25 transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#1c1c1e] flex p-2">
        <div className="w-1/4 bg-[#1c1c1e]/80 border-r border-white/8 p-2 flex flex-col gap-1">
          <div className="h-2 w-full bg-white/6 rounded" />
          <div className="h-5 w-full bg-white/10 rounded" />
          <div className="h-5 w-full rounded" />
          <div className="h-5 w-full rounded" />
        </div>
        <div className="flex-1 bg-[#2c2c2e] p-3">
          <div className="h-3 w-2/3 bg-white/15 rounded mb-2" />
          <div className="h-2 w-full bg-white/8 rounded mb-1" />
          <div className="h-2 w-4/5 bg-white/6 rounded mb-3" />
          <div className="bg-[#3a3a3c] border border-white/8 rounded-lg p-2">
            <div className="h-2 w-1/2 bg-white/12 rounded mb-1" />
            <div className="h-2 w-3/4 bg-white/6 rounded" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

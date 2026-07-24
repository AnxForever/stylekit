import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9] text-white font-semibold rounded-lg shadow-[0_12px_35px_rgba(59,130,246,0.25)] hover:shadow-[0_16px_45px_rgba(14,165,233,0.25)] transition-shadow">
        Scroll
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f8fafc] border border-[#93c5fd] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.10)]">
        <div className="h-2 w-16 bg-[#3b82f6] rounded-full mb-3" />
        <h3 className="font-semibold text-lg text-[#1e3a5f]">Parallax Card</h3>
        <p className="text-sm text-[#1e3a5f]/70">Depth by motion</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Type..."
        className="w-full px-4 py-3 bg-white border border-[#93c5fd] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/15"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="w-full max-w-[240px] relative">
          <div className="h-14 bg-gradient-to-r from-[#1e3a5f] to-[#3b82f6] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.10)]" />
          <div className="absolute left-3 top-8 right-3 h-14 bg-gradient-to-r from-[#93c5fd] to-[#0ea5e9] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.10)]" />
          <div className="absolute left-6 top-[68px] right-6 h-14 bg-white border border-[#93c5fd] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.10)]" />
          <div className="mt-[132px] flex items-center justify-between">
            <div className="text-[10px] font-semibold tracking-[0.22em] text-[#1e3a5f]">PARALLAX</div>
            <div className="h-2 w-10 bg-[#3b82f6] rounded-full" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

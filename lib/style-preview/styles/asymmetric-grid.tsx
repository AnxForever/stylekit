import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#0f0f0f] text-white font-semibold tracking-wide border border-[#ff3366] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white border-2 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="col-span-2 h-4 bg-[#ffcc00]" />
          <div className="h-4 bg-[#00d4ff]" />
          <div className="h-8 bg-[#ff3366]" />
          <div className="col-span-2 h-8 bg-[#0f0f0f]" />
        </div>
        <p className="text-sm text-black/70">Tension, overlap, rhythm</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Type..."
        className="w-full px-4 py-3 bg-white border-2 border-black focus:outline-none focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-shadow"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[240px]">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-4 h-10 bg-[#0f0f0f]" />
            <div className="col-span-2 h-10 bg-[#ffcc00]" />
            <div className="col-span-2 h-16 bg-[#ff3366]" />
            <div className="col-span-4 h-16 bg-[#00d4ff]" />
            <div className="col-span-3 h-10 bg-[#ffffff] border-2 border-black" />
            <div className="col-span-3 h-10 bg-[#ffffff] border-2 border-black" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-[10px] font-semibold tracking-[0.22em] text-black">ASYMMETRIC</div>
            <div className="h-2 w-10 bg-[#ff3366]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ff0000] text-white font-black uppercase tracking-widest hover:bg-[#000000] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#ffffff] border-4 border-[#000000]">
        <h3 className="font-black text-xl text-[#000000] uppercase tracking-wider mb-2">Swiss Poster Card</h3>
        <p className="text-sm text-[#000000]/60 uppercase">Bold typography</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="TYPE HERE..." className="w-full px-4 py-3 bg-[#ffffff] border-4 border-[#000000] text-[#000000] font-bold uppercase placeholder-[#000000]/30 focus:outline-none focus:border-[#ff0000] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#ffffff] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-4 border-[#000000] p-4 bg-[#ffffff]">
          <div className="font-black text-base text-[#000000] uppercase tracking-wider mb-2">Swiss</div>
          <p className="text-xs text-[#000000]/60 uppercase mb-3">Grid system</p>
          <button className="bg-[#ff0000] text-white text-xs px-4 py-2 font-black uppercase">Action</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

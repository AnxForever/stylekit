import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ffff00] text-black font-black uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_#00ccff] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
        Pow
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ff0066]">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="h-3 w-3 bg-[#ff0066] border-2 border-black" />
          <div className="h-3 w-3 bg-[#00ccff] border-2 border-black" />
          <div className="h-3 w-3 bg-[#ffff00] border-2 border-black" />
        </div>
        <h3 className="font-black text-xl">Pop Art Card</h3>
        <p className="text-sm text-black/70">Bold dots, loud colors</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Type..."
        className="w-full px-4 py-3 bg-white border-4 border-black text-black placeholder-black/40 focus:outline-none focus:shadow-[5px_5px_0px_0px_#ff0066] transition-shadow"
      />
    ),
    coverPreview: () => (
      <div
        className="w-full h-full flex items-center justify-center p-4"
        style={{
          backgroundColor: "#ff0066",
          backgroundImage: "radial-gradient(rgba(0,0,0,0.35) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      >
        <div className="w-full max-w-[220px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ffff00] p-4">
          <div className="text-xs font-black tracking-[0.24em] mb-2">POP ART</div>
          <div className="h-2 w-full bg-[#00ccff] border-2 border-black mb-3" />
          <button className="w-full px-3 py-2 bg-[#ffff00] border-4 border-black font-black text-xs shadow-[4px_4px_0px_0px_#00ccff]">
            Action
          </button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

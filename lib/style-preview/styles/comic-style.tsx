import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ff3333] border-4 border-black rounded-none text-white font-black uppercase shadow-[4px_4px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#000] transition-all duration-100">
        CLICK!
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white border-4 border-black rounded-none shadow-[6px_6px_0_#000] relative">
        <div className="absolute -top-3 -right-3 bg-[#ffcc00] border-2 border-black px-2 py-1 font-black text-xs rotate-3">NEW!</div>
        <h3 className="text-lg font-black uppercase text-black mb-2">COMIC CARD</h3>
        <p className="text-gray-700 text-sm">A panel from the story!</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="TYPE HERE..."
        className="w-full px-4 py-3 bg-white border-4 border-black rounded-none text-black placeholder-gray-400 font-bold uppercase focus:outline-none focus:shadow-[inset_0_0_0_2px_#ff3333]"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-3 relative">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '6px 6px'
        }} />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-white border-4 border-black p-4 shadow-[5px_5px_0_#000] relative">
            <div className="absolute -top-2 -right-2 bg-[#ffcc00] border-2 border-black px-2 py-0.5 font-black text-[8px] rotate-3">POW!</div>
            <div className="font-black text-sm text-black uppercase mb-2">COMIC</div>
            <p className="text-gray-600 text-[10px] mb-3">Manga style panels</p>
            <button className="w-full py-2 bg-[#ff3333] border-3 border-black text-white text-xs font-black uppercase shadow-[3px_3px_0_#000]">
              READ!
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

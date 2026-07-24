import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-transparent border-2 border-dashed border-[#2c2c2c] rounded-sm text-[#2c2c2c] font-serif italic hover:bg-[#2c2c2c] hover:text-[#f5f0e8] transition-all duration-200">
        Click here
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e8] border-2 border-[#2c2c2c] rounded-sm rotate-[-0.5deg] shadow-[3px_3px_0_rgba(44,44,44,0.15)]">
        <h3 className="text-lg font-serif italic text-[#2c2c2c] mb-2">Sketch Card</h3>
        <p className="text-[#666] font-serif text-sm">Drawn with pencil</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Write something..."
        className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] placeholder-[#999] font-serif italic focus:outline-none focus:border-solid focus:border-[#e74c3c]"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e8] flex items-center justify-center p-3 relative">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232c2c2c' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative w-full max-w-[180px] rotate-[-0.5deg]">
          <div className="bg-white border-2 border-[#2c2c2c] border-dashed p-4 shadow-[3px_3px_0_rgba(44,44,44,0.15)]">
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-[#2c2c2c]" />
            <div className="font-serif italic text-sm text-[#2c2c2c] mb-2">Sketch</div>
            <p className="text-[#666] font-serif text-[10px] italic mb-3">Hand-drawn feel</p>
            <button className="w-full py-2 bg-[#2c2c2c] text-[#f5f0e8] text-xs font-serif italic rounded-sm">
              Draw
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

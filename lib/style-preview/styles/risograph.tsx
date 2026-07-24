import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#ff6b9d] text-[#f5f5f0] font-bold tracking-wide border-2 border-[#2563eb] rounded hover:bg-[#2563eb] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f5f0] border-2 border-[#ff6b9d] rounded">
        <h3 className="font-bold text-xl text-[#2563eb] mb-2">Risograph Card</h3>
        <p className="text-sm text-[#ff6b9d]">Overprint aesthetic</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Print here..." className="w-full px-4 py-3 bg-[#f5f5f0] border-2 border-[#2563eb] rounded text-[#ff6b9d] placeholder-[#ff6b9d]/40 focus:outline-none focus:border-[#ff8a00] transition-colors" />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f5f0] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-[#ff6b9d] rounded p-4 bg-[#f5f5f0]">
          <div className="font-bold text-base text-[#2563eb] mb-2">Risograph</div>
          <p className="text-xs text-[#ff6b9d] mb-3">Spot color print</p>
          <button className="bg-[#ff6b9d] text-[#f5f5f0] text-xs px-4 py-2 rounded border-2 border-[#2563eb]">Print</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#fff8e7] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-[#e63946] bg-white p-4 rounded">
          <div className="text-[#e63946] text-sm font-bold mb-2">Indian Festive</div>
          <div className="flex gap-1 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#e63946]" />
            <div className="w-2 h-2 rounded-full bg-[#f77f00]" />
            <div className="w-2 h-2 rounded-full bg-[#e63946]" />
          </div>
          <p className="text-[#e63946]/60 text-xs mb-3">Vibrant celebrations</p>
          <button className="bg-[#e63946] text-white text-xs px-3 py-1 rounded">Celebrate</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

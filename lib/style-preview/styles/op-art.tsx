import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-4 border-black bg-white p-4">
          <div className="flex gap-1 mb-2">
            <div className="w-3 h-3 bg-black" /><div className="w-3 h-3 bg-white border border-black" /><div className="w-3 h-3 bg-black" /><div className="w-3 h-3 bg-[#ff3300]" />
          </div>
          <div className="text-black text-sm font-bold mb-1">Op Art</div>
          <p className="text-black/60 text-xs mb-3">Optical illusion patterns</p>
          <div className="h-1 bg-black" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

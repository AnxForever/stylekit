import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#faf9f7] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#3d4a5c]/15 bg-white rounded-2xl p-4">
          <div className="text-[#3d4a5c] text-sm mb-2">Korean Minimal</div>
          <p className="text-[#8b9bb0] text-xs mb-3">Soft refined simplicity</p>
          <button className="border border-[#3d4a5c]/20 text-[#3d4a5c] text-xs px-4 py-1.5 rounded-full">Explore</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

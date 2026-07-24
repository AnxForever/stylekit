import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#f6f8fa] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#d0d7de] bg-white rounded-md p-4">
          <div className="text-[#1f2328] text-sm font-semibold mb-2">GitHub Style</div>
          <p className="text-[#656d76] text-xs mb-3">Clean developer tooling</p>
          <button className="bg-[#1f883d] text-white text-xs px-3 py-1 rounded-md font-medium">Commit</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

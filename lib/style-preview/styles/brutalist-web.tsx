import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#ffffff] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-black bg-white p-4">
          <div className="text-black text-sm font-mono font-bold mb-2">BRUTALIST</div>
          <p className="text-black/60 text-xs font-mono mb-3">Raw HTML aesthetics</p>
          <a className="text-[#0000ff] text-xs font-mono underline">click_here.html</a>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#1e3a5f] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-white/30 bg-[#1e3a5f] p-4">
          <div className="text-white text-xs font-mono tracking-wider mb-2">BLUEPRINT</div>
          <div className="h-px bg-white/30 mb-3" />
          <p className="text-white/50 text-xs font-mono mb-3">Technical schematics</p>
          <div className="grid grid-cols-3 gap-1">
            <div className="h-2 border border-white/20" />
            <div className="h-2 border border-white/20" />
            <div className="h-2 border border-white/20" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

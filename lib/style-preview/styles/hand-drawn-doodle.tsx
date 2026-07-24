import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#fffef5] text-[#2c2c2c] font-medium border-2 border-[#2c2c2c] rounded-lg hover:bg-[#ff6b6b] hover:text-white transition-colors" style={{ borderStyle: "dashed" }}>
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#fffef5] border-2 border-[#2c2c2c] rounded-lg" style={{ borderStyle: "dashed" }}>
        <h3 className="text-xl text-[#2c2c2c] mb-2">Doodle Card</h3>
        <p className="text-sm text-[#2c2c2c]/60">Sketched by hand</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Scribble here..." className="w-full px-4 py-3 bg-[#fffef5] border-2 border-[#2c2c2c] rounded-lg text-[#2c2c2c] placeholder-[#2c2c2c]/40 focus:outline-none focus:border-[#4ecdc4] transition-colors" style={{ borderStyle: "dashed" }} />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#fffef5] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border-2 border-[#2c2c2c] rounded-lg p-4 bg-[#fffef5]" style={{ borderStyle: "dashed" }}>
          <div className="text-base text-[#2c2c2c] mb-2">Doodle</div>
          <p className="text-xs text-[#2c2c2c]/60 mb-3">Hand-drawn feel</p>
          <button className="bg-[#ff6b6b] text-white text-xs px-4 py-2 rounded-lg">Draw</button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

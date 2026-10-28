import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1C1C1C] text-[#F9F8F6] text-sm tracking-widest uppercase hover:bg-[#1C1C1C]/90 transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#F9F8F6] border border-[#1C1C1C]/10">
        <p className="text-xs tracking-widest uppercase text-[#595959] mb-2">Featured</p>
        <h3 className="font-serif text-xl italic mb-2 text-[#1C1C1C]">Editorial Card</h3>
        <p className="text-sm text-[#1C1C1C]/60">优雅的杂志编排风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-0 py-3 bg-transparent border-b border-[#1C1C1C]/20 text-sm tracking-wide focus:outline-none focus:border-[#1C1C1C] transition-colors"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#F9F8F6] flex items-center justify-center p-6">
        <div className="w-full max-w-[200px]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#595959] mb-2">Featured</p>
          <h3 className="font-serif text-xl italic mb-1 text-[#1C1C1C]">Editorial</h3>
          <div className="w-8 h-px bg-[#1C1C1C]/20 mb-3" />
          <p className="text-xs text-[#1C1C1C]/60 leading-relaxed mb-4">优雅的杂志排版，衬线标题与留白之美</p>
          <button className="text-[10px] tracking-[0.15em] uppercase px-4 py-2 border border-[#1C1C1C]/20 text-[#1C1C1C] hover:border-[#1C1C1C]/60">
            Read More
          </button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

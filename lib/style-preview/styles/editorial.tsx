import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-black text-white text-sm tracking-widest uppercase hover:bg-zinc-800 transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 border border-zinc-200">
        <p className="text-xs tracking-widest uppercase text-zinc-400 mb-2">Featured</p>
        <h3 className="font-serif text-xl italic mb-2">Editorial Card</h3>
        <p className="text-sm text-zinc-600">优雅的杂志编排风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-0 py-3 bg-transparent border-b border-zinc-300 text-sm tracking-wide focus:outline-none focus:border-black transition-colors"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#fafafa] flex items-center justify-center p-6">
        <div className="w-full max-w-[200px]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-2">Featured</p>
          <h3 className="font-serif text-xl italic mb-1 text-zinc-900">Editorial</h3>
          <div className="w-8 h-px bg-zinc-300 mb-3" />
          <p className="text-xs text-zinc-500 leading-relaxed mb-4">优雅的杂志排版，衬线标题与留白之美</p>
          <button className="text-[10px] tracking-[0.15em] uppercase px-4 py-2 border border-zinc-300 text-zinc-800 hover:border-zinc-900">
            Read More
          </button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

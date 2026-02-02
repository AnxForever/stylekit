// 风格组件渲染器 - 从 compare 页面提取的共享模块
// 用于在对比页面和其他需要展示风格组件的地方复用

import * as React from "react";

export type ComponentType = "button" | "card" | "input" | "coverPreview";

export const componentLabels: Record<ComponentType, string> = {
  button: "按钮",
  card: "卡片",
  input: "输入框",
  coverPreview: "封面预览",
};

// Style-specific component renderers
export const styleComponents: Record<
  string,
  Partial<Record<ComponentType, () => React.ReactNode>>
> = {
  "neo-brutalist": {
    button: () => (
      <button className="px-6 py-3 bg-[#ff006e] text-white font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#ccff00] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="font-black text-xl mb-2">Neo-Brutalist Card</h3>
        <p className="font-mono text-sm">大胆、直接、有冲击力的设计风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border-4 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#ccff00] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4">
            <div className="font-black text-base mb-3">BRUTAL</div>
            <p className="font-mono text-xs mb-3 text-gray-600">大胆直接的设计</p>
            <button className="bg-[#ff006e] text-white text-xs font-black px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              ACTION
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "neo-brutalist-soft": {
    button: () => (
      <button className="px-6 py-3 bg-[#a855f7] text-white font-bold rounded-2xl border-2 border-black/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-black/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
        <h3 className="font-bold text-xl mb-2">Soft Brutalist Card</h3>
        <p className="text-sm text-gray-600">柔和的新粗野主义风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white rounded-xl border-2 border-black/20 focus:outline-none focus:border-purple-400 transition-colors"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-black/10 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)] p-4">
            <div className="font-bold text-base mb-3 text-gray-800">Soft Card</div>
            <p className="text-xs mb-3 text-gray-500">柔和的野兽派</p>
            <button className="bg-[#a855f7] text-white text-xs font-bold px-4 py-2 rounded-xl border-2 border-black/15 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
              Button
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "neo-brutalist-playful": {
    button: () => (
      <button className="px-6 py-3 bg-[#fbbf24] text-black font-black rounded-full border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:rotate-1 transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#c4b5fd] rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
        <h3 className="font-black text-xl mb-2">Playful Card</h3>
        <p className="text-sm">活泼有趣的设计风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-[#fef3c7] rounded-full border-3 border-black font-mono focus:outline-none focus:rotate-1 transition-transform"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#4ecdc4] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] rotate-[-1deg]">
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,107,107,1)] p-4 rotate-[2deg]">
            <span className="text-2xl mb-2 block">🎨</span>
            <div className="font-black text-base mb-2">PLAYFUL!</div>
            <p className="text-xs mb-3 text-gray-600">有趣的设计</p>
            <button className="bg-[#ffe66d] text-black text-xs font-black px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
              Fun
            </button>
          </div>
        </div>
      </div>
    ),
  },
  editorial: {
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
  },
  neumorphism: {
    button: () => (
      <button className="px-6 py-3 bg-[#e0e5ec] text-zinc-600 font-medium rounded-xl shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] transition-shadow">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#e0e5ec] rounded-2xl shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]">
        <h3 className="font-semibold text-lg mb-2 text-zinc-700">Neumorphism Card</h3>
        <p className="text-sm text-zinc-500">柔和的新拟态风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-[#e0e5ec] rounded-xl shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] text-zinc-600 focus:outline-none"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#e0e5ec] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-[#e0e5ec] rounded-2xl shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-4">
            <div className="font-semibold text-base mb-2 text-zinc-700">Neumorphism</div>
            <p className="text-xs text-zinc-500 mb-3">柔和立体的界面</p>
            <div className="flex gap-2">
              <button className="bg-[#e0e5ec] text-xs font-medium text-zinc-600 px-4 py-2 rounded-lg shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]">
                Button
              </button>
              <div className="w-8 h-8 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#6d5dfc]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  glassmorphism: {
    button: () => (
      <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
        <button className="px-6 py-3 bg-white/20 backdrop-blur-md text-white font-medium rounded-lg border border-white/30 hover:bg-white/30 transition-all">
          点击按钮
        </button>
      </div>
    ),
    card: () => (
      <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
        <div className="p-6 bg-white/15 backdrop-blur-xl rounded-xl border border-white/20">
          <h3 className="font-semibold text-lg mb-2 text-white">Glassmorphism Card</h3>
          <p className="text-sm text-white/70">毛玻璃透明效果</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="p-4 bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl">
        <input
          type="text"
          placeholder="输入内容..."
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
        />
      </div>
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/25 p-4 shadow-xl">
            <div className="font-semibold text-base mb-2 text-white">Glass Card</div>
            <p className="text-xs text-white/70 mb-3">毛玻璃透明效果</p>
            <div className="flex gap-2">
              <button className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-lg border border-white/30">
                Button
              </button>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  "bento-grid": {
    button: () => (
      <button className="px-6 py-3 bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-800 transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white">
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
        <h3 className="font-bold text-lg mb-2">Bento Card</h3>
        <p className="text-sm text-white/80">便当盒布局风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-zinc-50 flex items-center justify-center p-3">
        <div className="w-full max-w-[220px] grid grid-cols-3 gap-1.5">
          {/* 大卡片 2x2 */}
          <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3 text-white">
            <div className="font-bold text-sm mb-1">Bento</div>
            <p className="text-[10px] text-white/70">不规则网格</p>
          </div>
          {/* 小卡片 */}
          <div className="bg-orange-100 rounded-lg p-2 flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-400 rounded-md" />
          </div>
          <div className="bg-green-100 rounded-lg p-2 flex items-center justify-center">
            <div className="w-4 h-4 bg-green-400 rounded-md" />
          </div>
          {/* 宽卡片 */}
          <div className="col-span-2 bg-zinc-100 rounded-lg p-2">
            <div className="text-[10px] font-medium text-zinc-600">Wide Card</div>
          </div>
          <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-400 rounded-md" />
          </div>
        </div>
      </div>
    ),
  },
};

// 渲染指定风格的指定组件
export function renderStyleComponent(styleSlug: string, component: ComponentType): React.ReactNode {
  const styleRenderer = styleComponents[styleSlug];
  if (!styleRenderer) {
    return <div className="text-muted text-sm">此风格暂无组件预览</div>;
  }
  return styleRenderer[component]?.() || <div className="text-muted text-sm">暂无此组件</div>;
}

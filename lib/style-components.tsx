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
      <button className="px-6 py-3 bg-[#fbbf24] text-black font-black rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:rotate-1 transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#c4b5fd] rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
        <h3 className="font-black text-xl mb-2">Playful Card</h3>
        <p className="text-sm">活泼有趣的设计风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-[#fef3c7] rounded-full border-[3px] border-black font-mono focus:outline-none focus:rotate-1 transition-transform"
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
  // ============ 新增风格渲染器 ============
  "corporate-clean": {
    button: () => (
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 font-medium">
        Get Started
      </button>
    ),
    card: () => (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Feature Title</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">专业简洁的企业风格设计</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="you@company.com"
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-600 rounded" />
              </div>
              <div className="font-semibold text-sm text-gray-900">Corporate</div>
            </div>
            <p className="text-xs text-gray-500 mb-3">专业企业风格</p>
            <button className="w-full bg-blue-600 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-sm">
              Get Started
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "minimalist-flat": {
    button: () => (
      <button className="px-6 py-3 bg-black text-white font-medium hover:bg-white hover:text-black border-2 border-black transition-colors duration-200">
        Get Started
      </button>
    ),
    card: () => (
      <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200 group">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300">Category</span>
        <h3 className="text-2xl font-bold mt-2 mb-4">Minimalist Card</h3>
        <p className="leading-relaxed">极简扁平，无阴影无渐变</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="your@email.com"
        className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="border-2 border-black p-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Minimal</span>
            <div className="font-bold text-lg mt-1 mb-3">Flat Design</div>
            <p className="text-xs text-gray-600 mb-4">极简扁平风格</p>
            <button className="bg-black text-white text-xs font-medium px-4 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors">
              Action
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "soft-ui": {
    button: () => (
      <button className="px-6 py-3 bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 font-medium">
        Get Started
      </button>
    ),
    card: () => (
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Soft UI</h3>
        <p className="text-gray-500 leading-relaxed">温和友好的界面风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="you@example.com"
        className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center mb-3">
              <div className="w-5 h-5 bg-indigo-500 rounded-lg" />
            </div>
            <div className="font-semibold text-base text-gray-800 mb-2">Soft UI</div>
            <p className="text-xs text-gray-500 mb-3">温和友好的设计</p>
            <button className="bg-indigo-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg shadow-indigo-500/30">
              Button
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "cyberpunk-neon": {
    button: () => (
      <button className="px-6 py-3 bg-transparent border border-cyan-400 text-cyan-400 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:bg-cyan-400/10 transition-all duration-300 font-mono uppercase tracking-wider">
        Initialize
      </button>
    ),
    card: () => (
      <div className="bg-gray-950 border border-cyan-400/30 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,255,0.2)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
            <h3 className="text-cyan-400 font-mono uppercase tracking-wider text-sm">System</h3>
          </div>
          <h4 className="text-white text-xl font-bold mb-3" style={{textShadow: '0 0 10px rgba(255,255,255,0.3)'}}>Cyberpunk</h4>
          <p className="text-gray-400 leading-relaxed">赛博朋克霓虹风格</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="relative">
        <input
          type="text"
          placeholder="Enter credentials..."
          className="w-full px-4 py-3 bg-gray-950 border border-cyan-400/30 rounded-lg text-cyan-400 font-mono placeholder:text-cyan-400/30 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse" />
      </div>
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-gray-950 border border-cyan-400/30 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-wider">System</span>
              </div>
              <div className="text-white font-bold text-sm mb-2" style={{textShadow: '0 0 10px rgba(0,255,255,0.5)'}}>Cyberpunk</div>
              <p className="text-gray-500 text-xs mb-3">霓虹发光效果</p>
              <button className="bg-transparent border border-cyan-400 text-cyan-400 text-[10px] font-mono uppercase px-3 py-1.5 rounded shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                Execute
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  "natural-organic": {
    button: () => (
      <button className="px-6 py-3 bg-stone-800 text-stone-50 rounded-full hover:bg-stone-700 transition-colors duration-300 font-medium">
        Shop Now
      </button>
    ),
    card: () => (
      <div className="bg-[#faf6f1] rounded-[2rem] p-8 border border-stone-200 hover:border-stone-300 transition-colors duration-300">
        <div className="w-16 h-16 bg-[#8b9d77]/20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#8b9d77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
        </div>
        <h3 className="text-xl font-serif text-stone-800 mb-3">Natural Organic</h3>
        <p className="text-stone-600 leading-relaxed">自然有机的温暖设计</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="hello@example.com"
        className="w-full px-5 py-3 bg-white border border-stone-200 rounded-full text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-all duration-300"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#faf6f1] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-white rounded-[1.5rem] p-4 border border-stone-200">
            <div className="w-10 h-10 bg-[#8b9d77]/20 rounded-full flex items-center justify-center mb-3">
              <div className="w-5 h-5 bg-[#8b9d77] rounded-full" />
            </div>
            <div className="font-serif text-base text-stone-800 mb-2">Organic</div>
            <p className="text-xs text-stone-500 mb-3">自然温暖的风格</p>
            <button className="bg-stone-800 text-stone-50 text-xs font-medium px-4 py-2 rounded-full">
              Explore
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "modern-gradient": {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl font-medium hover:from-violet-600 hover:to-fuchsia-600 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300">
        Get Started
      </button>
    ),
    card: () => (
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
        <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Modern Gradient</h3>
        <p className="text-white/70 leading-relaxed">现代渐变玻璃效果</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="you@example.com"
        className="w-full px-5 py-3.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* 装饰性光晕 */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-violet-500 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-fuchsia-500 rounded-full blur-3xl opacity-30" />
        <div className="w-full max-w-[200px] relative z-10">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-4">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center mb-3">
              <div className="w-5 h-5 bg-white/80 rounded" />
            </div>
            <div className="font-semibold text-base text-white mb-2">Gradient</div>
            <p className="text-xs text-white/60 mb-3">现代渐变风格</p>
            <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-medium px-4 py-2 rounded-xl shadow-lg shadow-violet-500/25">
              Action
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "retro-vintage": {
    button: () => (
      <button className="px-6 py-3 bg-[#8b4513] text-[#f5e6d3] border-2 border-[#5c2e0a] font-serif uppercase tracking-widest text-sm hover:bg-[#5c2e0a] transition-colors duration-200">
        Discover More
      </button>
    ),
    card: () => (
      <div className="bg-[#f5e6d3] border-2 border-[#8b4513] p-8 relative">
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8b4513]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8b4513]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8b4513]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8b4513]" />
        <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/60">Chapter</span>
        <h3 className="text-2xl font-serif text-[#8b4513] mt-2 mb-4">Retro Vintage</h3>
        <p className="text-[#8b4513]/80 leading-relaxed font-serif">复古怀旧的设计风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Enter your name..."
        className="w-full px-4 py-3 bg-transparent border-2 border-[#8b4513] text-[#8b4513] font-serif placeholder:text-[#8b4513]/40 focus:outline-none focus:bg-[#8b4513]/5 transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5e6d3] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="border-2 border-[#8b4513] p-4 relative">
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#8b4513]" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#8b4513]" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#8b4513]" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#8b4513]" />
            <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#8b4513]/60">Vintage</span>
            <div className="font-serif text-lg text-[#8b4513] mt-1 mb-2">Retro</div>
            <p className="text-xs text-[#8b4513]/70 font-serif mb-3">复古怀旧风格</p>
            <button className="bg-[#8b4513] text-[#f5e6d3] text-[10px] font-serif uppercase tracking-widest px-3 py-1.5 border-2 border-[#5c2e0a]">
              Explore
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "dark-mode": {
    button: () => (
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium">
        Save Changes
      </button>
    ),
    card: () => (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-100">Dark Mode</h3>
        </div>
        <p className="text-slate-400 leading-relaxed">优雅的深色界面设计</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="you@example.com"
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded" />
              </div>
              <div className="font-semibold text-sm text-slate-100">Dark</div>
            </div>
            <p className="text-xs text-slate-400 mb-3">深色界面设计</p>
            <button className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg">
              Action
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "geometric-bold": {
    button: () => (
      <button className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-red-500 transition-colors duration-200">
        Explore
      </button>
    ),
    card: () => (
      <div className="relative bg-white border-4 border-black p-8 group">
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-500 rotate-45 group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-xs font-bold uppercase tracking-[0.3em]">01</span>
        <h3 className="text-3xl font-black uppercase mt-2 mb-4">Geometric</h3>
        <p className="text-gray-600 leading-relaxed">大胆的几何图形设计</p>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-black" />
      </div>
    ),
    input: () => (
      <input
        type="email"
        placeholder="YOUR@EMAIL.COM"
        className="w-full px-4 py-4 bg-white border-4 border-black text-black font-medium placeholder:text-gray-400 focus:outline-none focus:bg-yellow-300 transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] relative">
          <div className="border-4 border-black p-4 relative">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rotate-45" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">01</span>
            <div className="font-black text-xl uppercase mt-1 mb-2">Bold</div>
            <p className="text-xs text-gray-600 mb-3">几何大胆风格</p>
            <button className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2">
              View
            </button>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600" />
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

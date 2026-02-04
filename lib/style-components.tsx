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
  // ============ 布局风格渲染器 ============
  "masonry-flow": {
    coverPreview: () => (
      // Natural Organic 风格 - 大地色调
      <div className="w-full h-full bg-[#faf6f1] flex items-center justify-center p-3">
        <div className="w-full max-w-[220px] columns-3 gap-1.5">
          <div className="break-inside-avoid mb-1.5 h-16 bg-gradient-to-br from-[#606c38] to-[#8b9d77] rounded-2xl" />
          <div className="break-inside-avoid mb-1.5 h-10 bg-gradient-to-br from-[#d4a373] to-[#bc6c25] rounded-2xl" />
          <div className="break-inside-avoid mb-1.5 h-20 bg-gradient-to-br from-[#5c4033] to-[#8b7355] rounded-2xl" />
          <div className="break-inside-avoid mb-1.5 h-12 bg-[#8b9d77]/30 rounded-2xl border border-[#8b9d77]/40" />
          <div className="break-inside-avoid mb-1.5 h-8 bg-gradient-to-br from-[#8b9d77] to-[#a3b18a] rounded-2xl" />
          <div className="break-inside-avoid mb-1.5 h-14 bg-gradient-to-br from-[#bc6c25] to-[#d4a373] rounded-2xl" />
        </div>
      </div>
    ),
  },
  "split-screen": {
    coverPreview: () => (
      // Modern Gradient 风格
      <div className="w-full h-full flex">
        <div className="flex-1 bg-zinc-900 flex items-center justify-center p-3 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30" />
          <div className="text-white text-center relative z-10">
            <div className="text-xs font-bold mb-1">LEFT</div>
            <div className="text-[10px] text-white/60">Dark Side</div>
          </div>
        </div>
        <div className="flex-1 bg-white flex items-center justify-center p-3">
          <div className="text-zinc-900 text-center">
            <div className="text-xs font-bold mb-1">RIGHT</div>
            <div className="text-[10px] text-zinc-500">Light Side</div>
          </div>
        </div>
      </div>
    ),
  },
  "full-page-scroll": {
    coverPreview: () => (
      // Modern Gradient 风格 - 渐变色
      <div className="w-full h-full flex flex-col relative">
        <div className="flex-1 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 flex items-center justify-center border-b border-white/20">
          <div className="text-white text-center">
            <div className="text-xs font-bold">SECTION 1</div>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-fuchsia-600 via-pink-500 to-orange-400 flex items-center justify-center border-b border-white/20">
          <div className="text-white text-center">
            <div className="text-xs font-bold">SECTION 2</div>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-cyan-600 via-blue-600 to-violet-700 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-xs font-bold">SECTION 3</div>
          </div>
        </div>
        {/* Navigation dots */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </div>
    ),
  },
  "timeline-vertical": {
    coverPreview: () => (
      // Editorial 风格 - 衬线字体、红色强调
      <div className="w-full h-full bg-[#fafafa] flex items-center justify-center p-4">
        <div className="w-full max-w-[180px] relative">
          {/* Central line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
          {/* Timeline items */}
          <div className="space-y-3">
            <div className="relative pl-8">
              <div className="absolute left-1.5 top-1 w-3 h-3 bg-[#e63946] rounded-full border-2 border-[#fafafa]" />
              <div className="bg-white p-2 border border-gray-200">
                <div className="text-[10px] font-semibold text-[#e63946]">2024</div>
                <div className="text-xs font-serif italic text-[#0a0a0a]">Event A</div>
              </div>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-1.5 top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-[#fafafa]" />
              <div className="bg-white p-2 border border-gray-200">
                <div className="text-[10px] font-semibold text-gray-500">2023</div>
                <div className="text-xs font-serif italic text-[#0a0a0a]">Event B</div>
              </div>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-1.5 top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-[#fafafa]" />
              <div className="bg-white p-2 border border-gray-200">
                <div className="text-[10px] font-semibold text-gray-500">2022</div>
                <div className="text-xs font-serif italic text-[#0a0a0a]">Event C</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  "card-stack": {
    coverPreview: () => (
      // Glassmorphism 风格 - 毛玻璃效果
      <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* 背景光晕 */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-violet-500/30 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl" />
        <div className="relative w-32 h-24">
          {/* Back card */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transform translate-y-4 scale-90 opacity-50" />
          {/* Middle card */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 transform translate-y-2 scale-95 opacity-75" />
          {/* Front card */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/80 to-purple-600/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-xs font-bold">STACK</div>
              <div className="text-[10px] text-white/70">Glass Effect</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  "sidebar-fixed": {
    coverPreview: () => (
      // Corporate Clean 风格 - 专业企业风格
      <div className="w-full h-full bg-slate-50 flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#1e3a5f] flex flex-col p-2">
          <div className="w-6 h-1.5 bg-blue-500 rounded mb-3" />
          <div className="space-y-1.5">
            <div className="h-2 bg-blue-600 rounded w-full" />
            <div className="h-2 bg-white/10 rounded w-3/4" />
            <div className="h-2 bg-white/10 rounded w-3/4" />
          </div>
          <div className="mt-auto">
            <div className="w-4 h-4 bg-blue-400/30 rounded-full" />
          </div>
        </div>
        {/* Main content */}
        <div className="flex-1 p-2">
          <div className="h-2 bg-slate-300 rounded w-1/2 mb-2" />
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-8 bg-white rounded-xl shadow-sm border border-slate-200" />
            <div className="h-8 bg-white rounded-xl shadow-sm border border-slate-200" />
          </div>
        </div>
      </div>
    ),
  },
  "magazine-grid": {
    coverPreview: () => (
      // Editorial 风格 - 杂志编排
      <div className="w-full h-full bg-[#fafafa] p-2">
        <div className="grid grid-cols-4 gap-1.5 h-full">
          {/* Featured - 2x2 */}
          <div className="col-span-2 row-span-2 bg-[#0a0a0a] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e63946]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-[#e63946] text-white text-[8px] px-1.5 py-0.5 inline-block mb-1">Featured</div>
              <div className="text-white text-[10px] font-serif italic">Main Article</div>
            </div>
          </div>
          {/* Small articles */}
          <div className="bg-gradient-to-br from-gray-700 to-gray-900" />
          <div className="bg-gradient-to-br from-gray-600 to-gray-800" />
          <div className="bg-gradient-to-br from-gray-500 to-gray-700" />
          <div className="bg-gradient-to-br from-gray-600 to-gray-800" />
        </div>
      </div>
    ),
  },
  "hero-fullscreen": {
    coverPreview: () => (
      // Cyberpunk Neon 风格 - 霓虹发光
      <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }} />
        {/* 霓虹光晕 */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#00ffff]/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-[#ff00ff]/20 rounded-full blur-xl" />
        <div className="relative z-10 text-center px-4">
          <div className="text-[#00ffff]/60 text-[8px] uppercase tracking-wider mb-1">Fullscreen</div>
          <div className="text-white font-bold text-sm mb-1" style={{textShadow: '0 0 10px rgba(0,255,255,0.5)'}}>Hero Layout</div>
          <div className="text-[#00ffff]/70 text-[10px]">Neon glow effect</div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#00ffff]/50">
          <div className="text-[8px]">Scroll</div>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </div>
    ),
  },
  "claymorphism": {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]">
        <h3 className="text-xl font-bold text-amber-800 mb-2">粘土卡片</h3>
        <p className="text-amber-700">柔软的 3D 立体效果</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-6 py-4 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.9),0_0_0_4px_rgba(248,180,217,0.3)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-amber-100 via-pink-100 to-purple-100 flex items-center justify-center p-3">
        <div className="w-full max-w-[180px]">
          <div className="bg-gradient-to-br from-white to-pink-50 rounded-[24px] p-4 shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.6),inset_-2px_-2px_4px_rgba(0,0,0,0.05)]">
            <div className="text-pink-600 font-bold text-sm mb-2">Clay Card</div>
            <p className="text-pink-500 text-[10px] mb-3">柔软的粘土质感</p>
            <button className="w-full py-2 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white text-xs font-bold shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]">
              Button
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "notion-style": {
    button: () => (
      <button className="px-4 py-2 bg-[#2eaadc] rounded-md text-white text-sm font-medium hover:bg-[#2997c9] transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-[#37352f] mb-2">Notion 卡片</h3>
        <p className="text-gray-600 text-sm">极简清爽的文档风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#37352f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2eaadc] focus:border-transparent transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex p-2">
        <div className="w-1/3 bg-[#f7f6f3] border-r border-gray-200 p-2">
          <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
          <div className="h-2 w-full bg-gray-100 rounded mb-1" />
          <div className="h-2 w-full bg-[#37352f]/10 rounded mb-1" />
          <div className="h-2 w-full bg-gray-100 rounded" />
        </div>
        <div className="flex-1 p-2">
          <div className="h-4 w-24 bg-[#37352f]/80 rounded mb-2" />
          <div className="h-2 w-full bg-gray-200 rounded mb-1" />
          <div className="h-2 w-3/4 bg-gray-200 rounded mb-3" />
          <div className="flex gap-1">
            <span className="px-1.5 py-0.5 bg-blue-50 text-[8px] text-[#2eaadc] rounded">Tag</span>
            <span className="px-1.5 py-0.5 bg-green-50 text-[8px] text-[#0f7b6c] rounded">Tag</span>
          </div>
        </div>
      </div>
    ),
  },
  "stripe-style": {
    button: () => (
      <button className="px-6 py-3 bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)] hover:shadow-[0_4px_8px_rgba(99,91,255,0.3),0_8px_16px_rgba(99,91,255,0.2)] hover:-translate-y-0.5 transition-all duration-200">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Stripe 卡片</h3>
        <p className="text-gray-600">专业的金融科技风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f6f9fc] flex items-center justify-center p-3 relative">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(to right, rgba(99,91,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,91,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }} />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-white rounded-xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            <div className="w-8 h-8 bg-gradient-to-br from-[#635bff] to-[#00d4ff] rounded-lg mb-3" />
            <div className="text-[#0a2540] font-semibold text-sm mb-1">Payments</div>
            <p className="text-gray-500 text-[10px] mb-3">Accept payments online</p>
            <button className="w-full py-2 bg-[#635bff] rounded-lg text-white text-xs font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "apple-style": {
    button: () => (
      <button className="px-6 py-3 bg-[#0071e3] rounded-full text-white font-medium hover:bg-[#0077ed] transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <h3 className="text-xl font-semibold tracking-tight text-black mb-2">Apple 卡片</h3>
        <p className="text-gray-500">极致简约的高端设计</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f5f7] flex items-center justify-center p-3">
        <div className="w-full max-w-[180px] text-center">
          <div className="bg-white rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)] mb-3">
            <div className="w-12 h-12 bg-[#f5f5f7] rounded-xl mx-auto mb-2" />
            <div className="text-black font-semibold text-sm">Product</div>
            <div className="text-gray-500 text-[10px]">From $999</div>
          </div>
          <button className="px-4 py-1.5 bg-[#0071e3] rounded-full text-white text-xs font-medium">
            Buy
          </button>
        </div>
      </div>
    ),
  },
  "pixel-art": {
    button: () => (
      <button className="px-6 py-3 bg-[#ff004d] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white border-4 border-[#1a1c2c] rounded-none shadow-[4px_4px_0_#1a1c2c]">
        <h3 className="text-xl font-bold uppercase text-[#1a1c2c] mb-2">像素卡片</h3>
        <p className="text-[#5f574f] uppercase text-sm">复古 8-bit 游戏风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border-4 border-[#1a1c2c] rounded-none text-[#1a1c2c] placeholder-[#8b8680] font-mono uppercase focus:outline-none focus:shadow-[inset_0_0_0_2px_#29adff] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#1a1c2c] flex items-center justify-center p-3">
        <div className="w-full max-w-[180px]">
          <div className="bg-white border-4 border-[#1a1c2c] p-3 shadow-[4px_4px_0_#ff004d]">
            <div className="text-[#1a1c2c] font-bold text-sm uppercase mb-2">Pixel</div>
            <p className="text-[#5f574f] text-[10px] uppercase mb-3">8-bit style</p>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-[#ff004d] border-2 border-[#1a1c2c]" />
              <div className="w-4 h-4 bg-[#00e436] border-2 border-[#1a1c2c]" />
              <div className="w-4 h-4 bg-[#29adff] border-2 border-[#1a1c2c]" />
              <div className="w-4 h-4 bg-[#ffec27] border-2 border-[#1a1c2c]" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // ============ 新增风格 - Vaporwave, Y2K, Memphis, Art Deco, Bauhaus, Synthwave ============
  "vaporwave": {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,113,206,0.5)] hover:shadow-[0_0_30px_rgba(255,113,206,0.7)] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-purple-900/80 to-pink-900/80 border border-pink-500/30 shadow-[0_0_30px_rgba(255,113,206,0.3)]">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">蒸汽波卡片</h3>
        <p className="text-pink-200/70">复古未来主义美学</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-purple-900/50 border border-pink-500/30 text-pink-100 placeholder-pink-400/50 focus:outline-none focus:border-pink-500 focus:shadow-[0_0_15px_rgba(255,113,206,0.3)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,113,206,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,113,206,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-purple-900/60 backdrop-blur-sm border border-pink-500/30 p-4 shadow-[0_0_20px_rgba(255,113,206,0.3)]">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-bold text-sm mb-2">VAPORWAVE</div>
            <p className="text-pink-300/60 text-[10px] mb-3">アエステティック</p>
            <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold uppercase shadow-[0_0_15px_rgba(255,113,206,0.5)]">
              Enter
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "y2k": {
    button: () => (
      <button className="px-6 py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-full text-white font-bold shadow-[0_4px_15px_rgba(255,105,180,0.4)] hover:shadow-[0_6px_20px_rgba(255,105,180,0.6)] hover:scale-105 transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-white/60 to-pink-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">Y2K 卡片</h3>
        <p className="text-gray-600">千禧年未来主义</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-[0_0_20px_rgba(255,105,180,0.3)] transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-pink-100 via-white to-cyan-100 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Bubbles */}
        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gradient-to-br from-pink-200/50 to-transparent blur-sm" />
        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-200/50 to-transparent blur-sm" />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-gradient-to-br from-white/70 to-pink-100/50 backdrop-blur-md rounded-3xl border border-white/60 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 font-bold text-sm mb-2">Y2K</div>
            <p className="text-gray-500 text-[10px] mb-3">千禧年美学</p>
            <button className="w-full py-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full text-white text-xs font-bold shadow-[0_4px_15px_rgba(255,105,180,0.3)]">
              Enter
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "memphis": {
    button: () => (
      <button className="relative px-6 py-3 bg-yellow-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
        <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
        点击按钮
      </button>
    ),
    card: () => (
      <div className="relative p-6 bg-pink-300 border-4 border-black shadow-[8px_8px_0px_#000]">
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full border-2 border-black" />
        <div className="absolute -bottom-2 -right-2 w-0 h-0 border-l-[15px] border-l-transparent border-b-[25px] border-b-cyan-400 border-r-[15px] border-r-transparent" />
        <h3 className="text-xl font-black text-black uppercase mb-2">孟菲斯卡片</h3>
        <p className="text-black/70 font-medium">大胆有趣的设计</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold placeholder-gray-400 shadow-[4px_4px_0px_#48dbfb] focus:shadow-[4px_4px_0px_#ff6b6b] focus:outline-none transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-yellow-300 via-pink-300 to-cyan-300 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-2 left-2 w-6 h-6 bg-red-500 rounded-full border-2 border-black" />
        <div className="absolute bottom-3 right-3 w-5 h-5 bg-blue-500 border-2 border-black rotate-45" />
        <div className="absolute top-1/3 right-4 w-0 h-0 border-l-[10px] border-l-transparent border-b-[16px] border-b-green-400 border-r-[10px] border-r-transparent" />
        <div className="relative w-full max-w-[180px]">
          <div className="relative bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000]">
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-black" />
            <div className="font-black text-sm text-black uppercase mb-2">MEMPHIS</div>
            <p className="text-gray-600 text-[10px] mb-3">大胆撞色风格</p>
            <button className="w-full py-2 bg-pink-400 border-2 border-black text-black text-xs font-black uppercase shadow-[3px_3px_0px_#000]">
              Fun!
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "art-deco": {
    button: () => (
      <button className="px-8 py-3 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.2em] border-2 border-yellow-400 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="relative p-6 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500" />
        <h3 className="text-xl font-serif text-yellow-500 text-center mb-2 tracking-wider">装饰艺术</h3>
        <p className="text-gray-400 text-center text-sm">奢华典雅的设计</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-slate-900 border border-yellow-600/50 text-yellow-100 placeholder-yellow-600/50 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Radial lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left"
                style={{ transform: `rotate(${i * 45}deg)` }}
              />
            ))}
          </div>
        </div>
        <div className="relative w-full max-w-[180px]">
          <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50 p-4">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500" />
            <div className="font-serif text-yellow-500 text-sm text-center mb-1 tracking-wider">ART DECO</div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-2" />
            <p className="text-gray-400 text-[10px] text-center mb-3">黄金时代</p>
            <button className="w-full py-2 border border-yellow-500 text-yellow-500 text-xs font-serif uppercase tracking-wider hover:bg-yellow-500 hover:text-black transition-all">
              Enter
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "bauhaus": {
    button: () => (
      <button className="px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-black transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="relative p-6 bg-white border-4 border-black">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-blue-600" />
        <h3 className="text-xl font-bold text-black uppercase tracking-wider mb-2">包豪斯卡片</h3>
        <p className="text-gray-700">形式追随功能</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border-4 border-black text-black font-medium placeholder-gray-400 focus:border-red-600 focus:outline-none transition-colors"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-white flex items-center justify-center p-3 relative overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute top-3 right-3 w-12 h-12 bg-yellow-400 rounded-full" />
        <div className="absolute bottom-4 right-6 w-8 h-8 bg-blue-600" />
        <div className="absolute top-8 right-10 w-0 h-0 border-l-[16px] border-l-transparent border-b-[28px] border-b-red-600 border-r-[16px] border-r-transparent" />
        <div className="relative w-full max-w-[180px]">
          <div className="relative bg-white border-4 border-black p-4">
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-600" />
            <div className="font-black text-lg text-black uppercase tracking-wider mb-1">BAU<br/>HAUS</div>
            <p className="text-gray-600 text-[10px] mb-3">功能主义</p>
            <button className="w-full py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
              Explore
            </button>
          </div>
        </div>
      </div>
    ),
  },
  "synthwave": {
    button: () => (
      <button className="px-6 py-3 bg-transparent border-2 border-pink-500 text-pink-500 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,255,0.5),inset_0_0_10px_rgba(255,0,255,0.1)] hover:bg-pink-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,255,0.8)] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-b from-purple-900/80 to-black/80 border border-pink-500/50 shadow-[0_0_20px_rgba(255,0,255,0.2)]">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-2">合成波卡片</h3>
        <p className="text-pink-200/70">复古未来主义</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-black/50 border-2 border-cyan-500/50 text-cyan-100 placeholder-cyan-500/50 shadow-[0_0_10px_rgba(0,255,255,0.1)] focus:border-pink-500 focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-b from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center p-3 relative overflow-hidden">
        {/* Sun */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-gradient-to-t from-orange-500 via-pink-500 to-purple-500 rounded-t-full opacity-60" />
        {/* Grid floor */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[linear-gradient(transparent_0%,rgba(255,0,255,0.1)_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,255,0.3)_1px,transparent_1px)] bg-[size:15px_8px] [transform:perspective(100px)_rotateX(60deg)] origin-bottom" />
        </div>
        <div className="relative w-full max-w-[180px] z-10">
          <div className="bg-gradient-to-b from-purple-900/80 to-black/80 backdrop-blur-sm border border-pink-500/30 p-4 shadow-[0_0_20px_rgba(255,0,255,0.3)]">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-bold text-sm mb-2">SYNTHWAVE</div>
            <p className="text-pink-300/60 text-[10px] mb-3">Ride into sunset</p>
            <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold uppercase shadow-[0_0_15px_rgba(255,0,255,0.5)]">
              Drive
            </button>
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

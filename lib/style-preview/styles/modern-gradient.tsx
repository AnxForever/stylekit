import type { StylePreviewComponents } from "../types";

const preview = {
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
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
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
  } satisfies StylePreviewComponents;

export default preview;

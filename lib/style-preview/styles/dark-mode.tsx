import type { StylePreviewComponents } from "../types";

const preview = {
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
  } satisfies StylePreviewComponents;

export default preview;

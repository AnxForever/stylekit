import type { StylePreviewComponents } from "../types";

const preview = {
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
  } satisfies StylePreviewComponents;

export default preview;

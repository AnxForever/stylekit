import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-2.5 bg-[#0078d4] text-white font-medium rounded-sm border border-[#0078d4] hover:bg-[#106ebe] active:bg-[#005a9e] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 transition-colors duration-100">
        Primary Button
      </button>
    ),
    card: () => (
      <div className="p-6 bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#0078d4] rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Fluent Card</h3>
            <p className="text-sm text-gray-500">Acrylic material</p>
          </div>
        </div>
        <p className="text-gray-700">Light, depth, motion, material, and scale working together.</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Enter text..."
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0078d4] focus:border-2 hover:border-gray-400 transition-colors duration-100"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-[#0078d4] via-[#106ebe] to-[#005a9e] flex items-center justify-center p-3 relative overflow-hidden">
        {/* Acrylic overlay shapes */}
        <div className="absolute top-2 -left-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 -right-4 w-12 h-12 bg-white/10 rounded-full blur-xl" />
        <div className="relative w-full max-w-[180px]">
          <div className="bg-white/70 backdrop-blur-xl rounded-lg p-4 border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#0078d4] rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded" />
              </div>
              <div className="font-semibold text-sm text-gray-900">Fluent</div>
            </div>
            <p className="text-[10px] text-gray-600 mb-3">Acrylic & depth</p>
            <button className="w-full py-2 bg-[#0078d4] text-white text-xs font-medium rounded-sm hover:bg-[#106ebe] transition-colors">
              Action
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

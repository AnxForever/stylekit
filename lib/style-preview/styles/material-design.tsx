import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#6200ee] text-white font-medium uppercase tracking-wider text-sm rounded-full shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)] hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.2),0_8px_10px_1px_rgba(0,0,0,0.14),0_3px_14px_2px_rgba(0,0,0,0.12)] hover:bg-[#7c4dff] active:bg-[#651fff] transition-all duration-200">
        Click Me
      </button>
    ),
    card: () => (
      <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] transition-shadow duration-300 overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-[#6200ee] to-[#b388ff]" />
        <div className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Material Card</h3>
          <p className="text-gray-600">Surfaces that cast shadows based on elevation.</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="relative">
        <input
          type="text"
          placeholder=" "
          className="peer w-full px-4 pt-5 pb-2 bg-gray-100 border-0 border-b-2 border-gray-300 rounded-t-lg text-gray-900 focus:outline-none focus:border-[#6200ee] focus:bg-gray-50 transition-all"
        />
        <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
          Email Address
        </label>
      </div>
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#fafafa] flex items-center justify-center p-3 relative">
        {/* App Bar */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-[#6200ee] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14)]">
          <div className="h-full flex items-center px-3">
            <div className="text-white text-xs font-medium">Material</div>
          </div>
        </div>
        <div className="relative w-full max-w-[180px] mt-4">
          <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] overflow-hidden">
            <div className="h-16 bg-gradient-to-br from-[#6200ee] via-[#7c4dff] to-[#b388ff]" />
            <div className="p-3">
              <div className="font-medium text-sm text-gray-900 mb-1">Card Title</div>
              <p className="text-[10px] text-gray-600 mb-2">Elevation shadows</p>
              <button className="px-3 py-1.5 bg-[#03dac6] text-black text-xs font-medium rounded-full shadow-md">
                Action
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

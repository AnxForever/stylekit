import type { StylePreviewComponents } from "../types";

const preview = {
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
  } satisfies StylePreviewComponents;

export default preview;

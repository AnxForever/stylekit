import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#fffef5] text-[#2c2c2c] font-medium border-2 border-[#2c2c2c] rounded-lg hover:bg-[#ff6b6b] hover:text-white transition-colors" style={{ borderStyle: "dashed" }}>
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#fffef5] border-2 border-[#2c2c2c] rounded-lg" style={{ borderStyle: "dashed" }}>
        <h3 className="text-xl text-[#2c2c2c] mb-2">Doodle Card</h3>
        <p className="text-sm text-[#2c2c2c]/60">Sketched by hand</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Scribble here..." className="w-full px-4 py-3 bg-[#fffef5] border-2 border-[#2c2c2c] rounded-lg text-[#2c2c2c] placeholder-[#2c2c2c]/40 focus:outline-none focus:border-[#4ecdc4] transition-colors" style={{ borderStyle: "dashed" }} />
    ),
    // Cover archetype: form panel. Wobbly strokes read as hand-drawn precisely
    // because they are drawing real controls.
    coverPreview: () => (
      <div className="w-full h-full bg-[#fffef5] overflow-hidden relative">
        <svg viewBox="0 0 372 279" className="absolute inset-0 w-full h-full">
          <path d="M20 52 q84 -8 168 -2" fill="none" stroke="#2c2c2c" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="20" y="70" width="214" height="32" rx="9" fill="none" stroke="#2c2c2c" strokeWidth="2.5" transform="rotate(-0.5 127 86)" />
          <rect x="20" y="114" width="214" height="32" rx="9" fill="none" stroke="#2c2c2c" strokeWidth="2.5" transform="rotate(0.4 127 130)" />
          <rect x="20" y="160" width="22" height="22" rx="5" fill="none" stroke="#2c2c2c" strokeWidth="2.5" transform="rotate(-1.5 31 171)" />
          <path d="M25 171 l6 7 l12 -16" fill="none" stroke="#4ecdc4" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="20" y="198" width="118" height="36" rx="11" fill="#ff6b6b" transform="rotate(-1 79 216)" />
          <rect x="20" y="198" width="118" height="36" rx="11" fill="none" stroke="#2c2c2c" strokeWidth="2.5" transform="rotate(-1 79 216)" />
          <path d="M152 222 q34 6 60 -14" fill="none" stroke="#2c2c2c" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M198 200 l16 6 l-8 13" fill="none" stroke="#2c2c2c" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M262 96 q38 -20 70 6 q28 24 -6 48 q-36 24 -70 -2 q-26 -24 6 -52" fill="none" stroke="#ffd93d" strokeWidth="6" strokeLinecap="round" />
        </svg>
        <div className="absolute left-[20px] top-[22px] text-[16px] text-[#2c2c2c]">Sign up</div>
        <div className="absolute left-[34px] top-[79px] text-[11px] leading-none text-[#2c2c2c]/45">
          your name
        </div>
        <div className="absolute left-[34px] top-[123px] text-[11px] leading-none text-[#2c2c2c]/45">
          hello@example.com
        </div>
        <div className="absolute left-[54px] top-[165px] text-[11px] leading-none text-[#2c2c2c]/75">
          send me doodles
        </div>
        <div className="absolute left-[52px] top-[210px] text-[12px] font-medium leading-none text-white">
          Join in
        </div>
        <div className="absolute left-[280px] top-[122px] text-[13px] leading-none text-[#2c2c2c]">
          it&rsquo;s free
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

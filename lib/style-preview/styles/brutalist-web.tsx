import type { StylePreviewComponents } from "../types";

const preview = {
    // Cover archetype: layout skeleton. The point of this style is an unstyled
    // document - default link blue, a horizontal rule, no card at all.
    coverPreview: () => (
      <div className="w-full h-full bg-white overflow-hidden px-5 py-4 font-serif text-black">
        <div className="text-[22px] font-bold leading-tight">Index of /docs</div>
        <div className="my-2 border-t-2 border-black" />
        <ul className="space-y-1 text-[12px]">
          <li>
            <span className="text-[#0000ff] underline">../parent directory</span>
          </li>
          <li>
            <span className="text-[#0000ff] underline">tokens.html</span>
            <span className="ml-2 text-[10px] text-black/60">12k</span>
          </li>
          <li>
            <span className="text-[#008000] underline">visited-spec.html</span>
            <span className="ml-2 text-[10px] text-black/60">4k</span>
          </li>
          <li>
            <span className="text-[#ff0000] underline">deprecated.html</span>
          </li>
        </ul>
        <div className="my-2 border-t border-black" />
        <div className="flex items-center gap-2 text-[11px]">
          <input type="checkbox" defaultChecked readOnly className="accent-black" />
          <span>no css</span>
          <button className="border-2 border-black bg-[#c0c0c0] px-2 py-[1px] text-[11px]">
            Submit
          </button>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

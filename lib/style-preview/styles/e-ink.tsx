import type { StylePreviewComponents } from "../types";

const preview = {
  coverPreview: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#f5f3ea] p-5">
      <article className="w-full max-w-[220px] border border-[#8a8b82] bg-[#e6e4da] p-4 font-sans text-[#20211e]">
        <header className="flex items-start justify-between border-b border-[#8a8b82] pb-2">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider">Daily archive</p>
            <p className="mt-1 text-sm font-semibold">Reading queue</p>
          </div>
          <span className="font-mono text-xs tabular-nums">04/12</span>
        </header>
        <ul className="mt-3 space-y-2 text-xs">
          <li className="border-l-2 border-[#20211e] pl-2">
            <span className="block font-mono font-semibold">01</span>
            <span>Print without color</span>
          </li>
          <li className="flex justify-between border-t border-[#bab9b0] pt-2">
            <span>Layout principles</span>
            <span className="font-mono">08m</span>
          </li>
        </ul>
        <div aria-hidden className="mt-3 h-5 border-y border-[#bab9b0] bg-[radial-gradient(#555750_0.6px,transparent_0.7px)] bg-[length:5px_5px]" />
      </article>
    </div>
  ),
  button: () => (
    <button className="rounded-none border border-[#20211e] bg-[#20211e] px-4 py-3 font-mono text-sm font-semibold text-[#f5f3ea] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#20211e]">
      Open item
    </button>
  ),
  card: () => (
    <article className="rounded-none border border-[#bab9b0] bg-[#e6e4da] p-5 text-[#20211e]">
      <p className="font-mono text-xs font-semibold uppercase text-[#555750]">Sample data</p>
      <p className="mt-2 text-xl font-semibold tabular-nums">21.4 °C</p>
    </article>
  ),
  input: () => (
    <input
      aria-label="Search sample archive"
      placeholder="Search sample archive"
      className="min-h-11 w-full rounded-none border border-[#77786f] bg-[#f5f3ea] px-3 py-2.5 text-[#20211e] placeholder:text-[#555750] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#20211e]"
    />
  ),
} satisfies StylePreviewComponents;

export default preview;

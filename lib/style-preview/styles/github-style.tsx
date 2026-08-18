import type { StylePreviewComponents } from "../types";

const preview = {
    // Cover archetype: data density. The GitHub language is grey scaffolding,
    // one blue interactive colour and dense rows - not a hero card.
    coverPreview: () => (
      <div className="w-full h-full bg-white overflow-hidden flex flex-col">
        <div className="flex items-center gap-1.5 border-b border-[#d0d7de] px-3 py-2">
          <div className="w-3 h-3 rounded-full bg-[#d0d7de]" />
          <div className="text-[9px] text-[#0969da]">stylekit</div>
          <div className="text-[9px] text-[#656d76]">/ tokens</div>
          <div className="ml-auto flex items-center gap-1 rounded-md border border-[#d0d7de] px-1.5 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1f883d]" />
            <div className="text-[8px] text-[#656d76]">main</div>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-[1fr_auto] gap-3 px-3 py-2">
          <div className="space-y-1.5">
            {[
              ["tokens.json", "#0969da"],
              ["recipes.ts", "#0969da"],
              ["README.md", "#656d76"],
              ["cover.svg", "#656d76"],
            ].map(([name, color]) => (
              <div key={name} className="flex items-center gap-1.5">
                <div className="w-2 h-2.5 border border-[#d0d7de] bg-[#f6f8fa]" />
                <div className="text-[9px]" style={{ color }}>
                  {name}
                </div>
                <div className="ml-auto text-[8px] text-[#656d76]">2h</div>
              </div>
            ))}
          </div>
          <div className="grid grid-rows-4 grid-flow-col gap-[2px] content-center">
            {Array.from({ length: 40 }).map((_, index) => {
              const level = (index * 7) % 5;
              const palette = ["#e1e4e8", "#aceebb", "#4ac26b", "#1f883d", "#0d4429"];
              return (
                <div
                  key={index}
                  className="w-[6px] h-[6px] rounded-[1px]"
                  style={{ backgroundColor: palette[level] }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-[#d0d7de] bg-[#f6f8fa] px-3 py-1.5">
          <div className="h-1 flex-1 rounded-full bg-[#0969da]/25" />
          <div className="text-[8px] text-[#cf222e]">-24</div>
          <div className="text-[8px] text-[#1f883d]">+186</div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-4 py-1.5 font-mono text-sm bg-[#4AF626] text-[#0A0E12] font-bold rounded-sm hover:bg-[#3FD41F] transition-colors duration-150">
        ./deploy --prod
      </button>
    ),
    card: () => (
      <div className="p-4 font-mono text-xs bg-[#0D141B] border border-[#1F2937] rounded-sm text-left space-y-1">
        <p className="text-[#4AF626]"><span className="text-[#8BE9FD]">visitor@stylekit</span><span className="text-[#6272A4]">:~$</span> whoami</p>
        <p className="text-[#6272A4]"># identity loaded from ~/.profile</p>
        <p className="text-[#4AF626]">stack: <span className="text-[#8BE9FD]">[typescript, react, node]</span></p>
      </div>
    ),
    input: () => (
      <div className="flex items-center gap-2 font-mono text-xs bg-[#0A0E12] border border-[#1F2937] rounded-sm px-3 py-2 w-64">
        <span className="shrink-0"><span className="text-[#8BE9FD]">visitor</span><span className="text-[#6272A4]">:~$</span></span>
        <input type="text" placeholder="type a command..." className="flex-1 min-w-0 bg-transparent text-[#4AF626] placeholder:text-[#6272A4] caret-[#4AF626] focus:outline-none" />
        <span className="w-1.5 h-3 bg-[#4AF626] animate-pulse" />
      </div>
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0A0E12] flex items-center justify-center p-4 font-mono">
        <div className="w-full max-w-[200px] bg-[#0D141B] border border-[#1F2937] rounded-sm overflow-hidden">
          <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[#1F2937]">
            <span className="w-1.5 h-1.5 rounded-sm bg-[#FF79C6]" />
            <span className="w-1.5 h-1.5 rounded-sm bg-[#FFB86C]" />
            <span className="w-1.5 h-1.5 rounded-sm bg-[#4AF626]" />
            <span className="ml-1 text-[7px] text-[#6272A4]">visitor@stylekit: ~</span>
          </div>
          <div className="px-2 py-2 space-y-1 text-[8px] leading-tight">
            <p className="text-[#4AF626]"><span className="text-[#8BE9FD]">visitor</span><span className="text-[#6272A4]">:~$</span> ls ~/projects</p>
            <p className="text-[#8BE9FD]">stylekit-registry/  cli-toolbox/</p>
            <p className="text-[#4AF626]">build [████████░░] <span className="text-[#FFB86C]">67%</span></p>
            <p className="text-[#4AF626]"><span className="text-[#8BE9FD]">visitor</span><span className="text-[#6272A4]">:~$</span> <span className="inline-block w-1 h-2 bg-[#4AF626] animate-pulse align-middle" /></p>
          </div>
          <div className="flex items-center justify-between px-2 py-1 border-t border-[#1F2937] text-[7px]">
            <span className="bg-[#4AF626] text-[#0A0E12] font-bold px-1 rounded-sm">[stylekit]</span>
            <span className="text-[#8BE9FD]">09:41</span>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;

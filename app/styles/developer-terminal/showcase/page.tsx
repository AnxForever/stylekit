import dynamicImport from "next/dynamic";
export const dynamic = "force-static";

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#0A0E12] flex items-center justify-center">
      <div className="font-mono text-sm text-[#4AF626] flex items-center gap-2">
        <span className="text-[#8BE9FD]">visitor@stylekit</span>
        <span className="text-[#6272A4]">:~$</span>
        <span>boot --showcase</span>
        <span className="inline-block w-2 h-4 bg-[#4AF626] animate-pulse" />
      </div>
    </div>
  ),
});

export default function DeveloperTerminalShowcase() {
  return <ShowcaseContent />;
}

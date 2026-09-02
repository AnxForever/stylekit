import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Broadcast Glitch Showcase - StyleKit",
  description:
    "A broken CRT signal, glowing: crawling scanlines, red-cyan channel splitting, SMPTE color bars and stepped glitch jumps in glitch red, CRT cyan and test-card yellow. Live Broadcast Glitch demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#0B0B0E] flex items-center justify-center">
      <p className="text-[#00E5D8] font-mono text-xs uppercase tracking-[0.3em]">// tuning signal...</p>
    </div>
  ),
});

export default function BroadcastGlitchShowcasePage() {
  return <ShowcaseContent />;
}

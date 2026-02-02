import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_20px_rgba(0,255,255,0.5)]" />
        <p className="font-mono text-cyan-400 text-xl tracking-wider">LOADING...</p>
      </div>
    </div>
  ),
});

export default function CyberpunkNeonShowcase() {
  return <ShowcaseContent />;
}

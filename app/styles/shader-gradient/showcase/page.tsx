import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Shader Gradient Showcase - StyleKit",
  description:
    "A living WebGL fragment-shader mesh gradient behind frosted-glass panels: fbm domain warp, devicePixelRatio-capped rendering, IntersectionObserver pause, reduced-motion and no-WebGL fallbacks. Live Shader Gradient demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#08090D] flex items-center justify-center">
      <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">Compiling the shader...</p>
    </div>
  ),
});

export default function ShaderGradientShowcasePage() {
  return <ShowcaseContent />;
}

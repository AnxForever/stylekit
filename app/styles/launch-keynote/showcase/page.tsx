import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Launch Keynote Showcase - StyleKit",
  description:
    "An Apple-keynote product reveal: a pitch-black stage, a scroll-scrubbed 96-frame sticky canvas, huge tight headlines and one electric-blue accent. Live Launch Keynote demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-[#86868B] font-mono text-xs uppercase tracking-[0.3em]">Preparing the stage...</p>
    </div>
  ),
});

export default function LaunchKeynoteShowcasePage() {
  return <ShowcaseContent />;
}

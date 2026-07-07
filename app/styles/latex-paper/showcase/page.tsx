import dynamicImport from "next/dynamic";
export const dynamic = "force-static";

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
      <p className="font-serif italic text-[#6B6B66]">Compiling document...</p>
    </div>
  ),
});

export default function LatexPaperShowcase() {
  return <ShowcaseContent />;
}

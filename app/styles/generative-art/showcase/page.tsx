import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


const GenerativeArtShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#0a0a0a]" />,
});

export default function GenerativeArtShowcasePage() {
  return <GenerativeArtShowcaseContent />;
}

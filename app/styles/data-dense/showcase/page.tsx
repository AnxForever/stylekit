import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#f8fafc]" />,
});

export default function DataDenseShowcase() {
  return <ShowcaseContent />;
}

import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#fef9f0]" />,
});

export default function FreshMarketShowcase() {
  return <ShowcaseContent />;
}

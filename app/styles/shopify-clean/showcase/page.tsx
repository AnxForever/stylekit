import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#f7f7f8]" />,
});

export default function ShopifyCleanShowcase() {
  return <ShowcaseContent />;
}

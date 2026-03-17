import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#f7f7f8]" />,
});

export default function ShopifyCleanShowcase() {
  return <ShowcaseContent />;
}

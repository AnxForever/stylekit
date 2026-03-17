import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#f8fafc]" />,
});

export default function DataDenseShowcase() {
  return <ShowcaseContent />;
}

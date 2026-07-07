import dynamicImport from "next/dynamic";
export const dynamic = "force-static";

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#1A1A1A]" />,
});

export default function StudioBoldShowcase() {
  return <ShowcaseContent />;
}

import dynamicImport from "next/dynamic";
export const dynamic = "force-static";

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#FCFCFA]" />,
});

export default function HorizontalGalleryShowcase() {
  return <ShowcaseContent />;
}

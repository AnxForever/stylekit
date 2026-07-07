import dynamicImport from "next/dynamic";
export const dynamic = "force-static";

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#0A0A0A]" />,
});

export default function GalleryDarkShowcase() {
  return <ShowcaseContent />;
}

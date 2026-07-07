import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#FAFAF8]" />,
});

export default function OversizedTypographyShowcase() {
  return <ShowcaseContent />;
}

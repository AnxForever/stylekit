import dynamicImport from "next/dynamic";
export const dynamic = "force-static";

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-white" />,
});

export default function DistillStyleShowcase() {
  return <ShowcaseContent />;
}

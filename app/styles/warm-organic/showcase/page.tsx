import dynamicImport from "next/dynamic";
export const dynamic = "force-static";

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#F5F0EB]" />,
});

export default function WarmOrganicShowcase() {
  return <ShowcaseContent />;
}

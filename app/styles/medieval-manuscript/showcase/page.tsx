import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Medieval Manuscript Showcase - StyleKit",
  description:
    "Live demonstration of Medieval Manuscript design with illuminated drop caps, gold ornate borders, parchment textures, and serif typography.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Bauhaus Showcase - StyleKit",
  description: "Live demonstration of Bauhaus design with primary colors, geometric forms, and functional minimalism.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function BauhausShowcasePage() {
  return <ShowcaseContent />;
}

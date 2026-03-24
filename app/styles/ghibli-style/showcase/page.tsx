import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Ghibli Style Showcase - StyleKit",
  description: "Live demonstration of Ghibli-inspired design with warm colors, dreamy atmosphere, and natural elements.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function GhibliStyleShowcasePage() {
  return <ShowcaseContent />;
}

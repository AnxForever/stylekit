import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Zen Garden Showcase - StyleKit",
  description: "Live demonstration of Zen Garden (Karesansui) design with sand textures, moss greens, and meditative minimalism.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

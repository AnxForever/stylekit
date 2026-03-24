import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Collage Art Showcase - StyleKit",
  description: "Live demonstration of Collage Art style with paper cutouts, torn edges, mixed fonts, and layered compositions.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function CollageArtShowcasePage() {
  return <ShowcaseContent />;
}

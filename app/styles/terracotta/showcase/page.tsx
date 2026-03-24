import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Terracotta Showcase - StyleKit",
  description:
    "Live demonstration of Terracotta design with warm earth tones, handcrafted textures, and Mediterranean warmth.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

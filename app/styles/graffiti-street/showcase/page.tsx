import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Graffiti Street Showcase - StyleKit",
  description:
    "Live demonstration of Graffiti Street design with spray-painted text, brick wall textures, neon clash colors, and raw urban energy.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Paper Craft Showcase - StyleKit",
  description: "Live demonstration of Paper Craft design with layered paper effects, offset shadows, and warm handmade textures.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

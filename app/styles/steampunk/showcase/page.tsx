import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Steampunk Showcase - StyleKit",
  description: "Live demonstration of Steampunk design with brass textures, gears, and Victorian-industrial aesthetics.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

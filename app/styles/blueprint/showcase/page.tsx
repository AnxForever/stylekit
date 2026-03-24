import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Blueprint Showcase - StyleKit",
  description: "Live demonstration of Blueprint design with engineering grid patterns, white-line diagrams, and technical annotation markers.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

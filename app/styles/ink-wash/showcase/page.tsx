import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Ink Wash Showcase - StyleKit",
  description:
    "Live demonstration of Ink Wash design with calligraphic warmth, xuan-paper tones, and meditative whitespace.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Constructivism Showcase - StyleKit",
  description:
    "Live demonstration of Constructivism design with bold red-black contrast, diagonal compositions, and propaganda-style typography.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

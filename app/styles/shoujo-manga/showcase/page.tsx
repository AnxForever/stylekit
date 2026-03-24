import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Shoujo Manga Style Showcase",
  description: "Dreamy anime aesthetic with sparkles and flowers showcase",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

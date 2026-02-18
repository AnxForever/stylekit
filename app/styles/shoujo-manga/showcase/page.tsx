import dynamic from "next/dynamic";

export const metadata = {
  title: "Shoujo Manga Style Showcase",
  description: "Dreamy anime aesthetic with sparkles and flowers showcase",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

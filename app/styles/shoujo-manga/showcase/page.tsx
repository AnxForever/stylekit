import dynamic from "next/dynamic";

export const metadata = {
  title: "Shoujo Manga Showcase - StyleKit",
  description: "Live demonstration of Shoujo Manga romantic aesthetic with cherry blossom petals, sparkles, and soft pink tones.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function ShoujoMangaShowcasePage() {
  return <ShowcaseContent />;
}

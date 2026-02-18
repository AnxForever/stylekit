import dynamic from "next/dynamic";

export const metadata = {
  title: "Pixel Anime Style Showcase",
  description: "8-bit retro anime game aesthetic showcase",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

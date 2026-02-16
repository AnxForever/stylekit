import dynamic from "next/dynamic";

export const metadata = {
  title: "Comic Style Showcase - StyleKit",
  description: "Live demonstration of Comic/Manga design style with halftone patterns, speech bubbles, and action lines.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function ComicStyleShowcasePage() {
  return <ShowcaseContent />;
}

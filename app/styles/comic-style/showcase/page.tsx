import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Comic Style Showcase - StyleKit",
  description: "Live demonstration of Comic/Manga design style with halftone patterns, speech bubbles, and action lines.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function ComicStyleShowcasePage() {
  return <ShowcaseContent />;
}

import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Surrealism Style Showcase",
  description: "Dreamlike scenes, impossible spaces and subconscious beauty",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

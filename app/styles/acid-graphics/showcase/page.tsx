import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Acid Graphics Style Showcase",
  description: "Psychedelic neon colors and distorted typography showcase",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

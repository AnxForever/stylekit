import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Hand-Drawn Doodle Style Showcase",
  description: "Playful hand-drawn illustrations and sketchy doodles showcase",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

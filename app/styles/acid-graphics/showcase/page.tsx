import dynamic from "next/dynamic";

export const metadata = {
  title: "Acid Graphics Style Showcase",
  description: "Psychedelic neon colors and distorted typography showcase",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

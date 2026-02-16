import dynamic from "next/dynamic";

export const metadata = {
  title: "Dark Academia Showcase - StyleKit",
  description: "Live demonstration of Dark Academia aesthetic with scholarly warmth, serif typography, and classical library ambiance.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function DarkAcademiaShowcasePage() {
  return <ShowcaseContent />;
}

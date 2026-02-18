import dynamic from "next/dynamic";

export const metadata = {
  title: "Risograph Print Style Showcase",
  description: "Dual-color overprint, halftone dots and grainy print textures",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

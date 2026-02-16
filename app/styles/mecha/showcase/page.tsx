import dynamic from "next/dynamic";

export const metadata = {
  title: "Mecha Showcase - StyleKit",
  description: "Live demonstration of Mecha aesthetic with armored panels, warning systems, and military-industrial design.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function MechaShowcasePage() {
  return <ShowcaseContent />;
}

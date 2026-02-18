import dynamic from "next/dynamic";

export const metadata = {
  title: "Cel Shading Showcase - StyleKit",
  description: "Live demonstration of Cel Shading design with bold outlines, flat shadows, and cartoon-style rendering.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

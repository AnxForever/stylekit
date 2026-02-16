import dynamic from "next/dynamic";

export const metadata = {
  title: "Card Stack Showcase - StyleKit",
  description: "Live demonstration of Card Stack layout with layered cards and depth effects.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function CardStackShowcasePage() {
  return <ShowcaseContent />;
}

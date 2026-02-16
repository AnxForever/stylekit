import dynamic from "next/dynamic";

export const metadata = {
  title: "Holy Grail Layout Showcase - StyleKit",
  description: "Live demonstration of Holy Grail Layout - the classic three-column web layout pattern.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function HolyGrailLayoutShowcasePage() {
  return <ShowcaseContent />;
}

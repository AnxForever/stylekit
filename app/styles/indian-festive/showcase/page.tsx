import dynamic from "next/dynamic";

export const metadata = {
  title: "Indian Festive Showcase - StyleKit",
  description: "Live demonstration of Indian Festive design with rich jewel tones, gold accents, and mandala-inspired decorations.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

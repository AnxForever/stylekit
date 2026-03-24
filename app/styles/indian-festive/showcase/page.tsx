import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Indian Festive Showcase - StyleKit",
  description: "Live demonstration of Indian Festive design with rich jewel tones, gold accents, and mandala-inspired decorations.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

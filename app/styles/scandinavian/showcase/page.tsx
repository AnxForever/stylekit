import dynamic from "next/dynamic";

export const metadata = {
  title: "Scandinavian Minimalism Showcase - StyleKit",
  description: "Live demonstration of Scandinavian design with warm tones, natural textures, and generous whitespace.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

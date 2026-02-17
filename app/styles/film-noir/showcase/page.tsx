import dynamic from "next/dynamic";

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function FilmNoirShowcase() {
  return <ShowcaseContent />;
}

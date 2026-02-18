import dynamic from "next/dynamic";

export const metadata = {
  title: "Witchcore Showcase - StyleKit",
  description: "Live demonstration of Witchcore design with mystic purple tones, gold rune accents, and stardust particle effects.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

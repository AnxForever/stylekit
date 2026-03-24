import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Witchcore Showcase - StyleKit",
  description: "Live demonstration of Witchcore design with mystic purple tones, gold rune accents, and stardust particle effects.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

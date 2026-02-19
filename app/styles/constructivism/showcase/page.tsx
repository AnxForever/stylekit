import dynamic from "next/dynamic";

export const metadata = {
  title: "Constructivism Showcase - StyleKit",
  description:
    "Live demonstration of Constructivism design with bold red-black contrast, diagonal compositions, and propaganda-style typography.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

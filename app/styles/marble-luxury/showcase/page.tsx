import dynamic from "next/dynamic";

export const metadata = {
  title: "Marble Luxury Showcase - StyleKit",
  description:
    "Live demonstration of Marble Luxury design with marble textures, gold accents, extreme whitespace, and elegant serif typography.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

import dynamic from "next/dynamic";

export const metadata = {
  title: "Korean Minimal Showcase - StyleKit",
  description: "Live demonstration of Korean Minimal design with generous whitespace, pastel accents, and refined simplicity.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

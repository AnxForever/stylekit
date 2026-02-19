import dynamic from "next/dynamic";

export const metadata = {
  title: "Pastel Goth Showcase - StyleKit",
  description: "Live demonstration of Pastel Goth design with dark purple depths, candy-colored highlights, and ethereal glow effects.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

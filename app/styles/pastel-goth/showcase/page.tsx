import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Pastel Goth Showcase - StyleKit",
  description: "Live demonstration of Pastel Goth design with dark purple depths, candy-colored highlights, and ethereal glow effects.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

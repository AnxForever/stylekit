import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Cubism Showcase - StyleKit",
  description:
    "Live demonstration of Cubism design with geometric fragmentation, multiple perspectives, and earth-toned palettes inspired by Picasso and Braque.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}

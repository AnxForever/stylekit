import { redirect } from "next/navigation";

export default async function LocalizedEditorialArchiveRedirect({
  params,
}: {
  params: Promise<{ locale: string; path?: string[] }>;
}) {
  const { path = [] } = await params;
  const suffix = path.length > 0 ? `/${path.join("/")}` : "";
  redirect(`/templates/editorial-profile-archive${suffix}`);
}

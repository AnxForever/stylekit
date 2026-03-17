import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { isValidSubmissionId, getSubmission } from "@/lib/submit/reviewer";
import {
  getSubmissionSupabase,
  isSupabaseConfigured,
} from "@/lib/submit/reviewer-supabase";
import { mapSubmissionToStyle } from "@/lib/styles/community-runtime";
import { CommunitySubmissionContent } from "./_content";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  if (!isValidSubmissionId(id)) return { title: "Not Found" };

  const submission = isSupabaseConfigured()
    ? (await getSubmissionSupabase(id)) ?? (await getSubmission(id))
    : await getSubmission(id);

  if (!submission || submission.status !== "approved") {
    return { title: "Not Found" };
  }

  const style = mapSubmissionToStyle(submission);
  if (!style) return { title: "Not Found" };
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top";

  return {
    title: `${style.name} — Community`,
    description: style.description,
    alternates: {
      canonical: `${baseUrl}/community/${id}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CommunitySubmissionPage({ params }: PageProps) {
  const { id } = await params;

  if (!isValidSubmissionId(id)) notFound();

  const submission = isSupabaseConfigured()
    ? (await getSubmissionSupabase(id)) ?? (await getSubmission(id))
    : await getSubmission(id);

  if (!submission || submission.status !== "approved") notFound();

  const style = mapSubmissionToStyle(submission);
  if (!style) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CommunitySubmissionContent submission={submission} style={style} />
      </main>
      <Footer />
    </div>
  );
}

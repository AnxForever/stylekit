import { generateLlmsFullText } from "@/lib/export/llms-full";

export async function GET() {
  const content = generateLlmsFullText();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

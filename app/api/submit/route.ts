import { retiredEndpoint } from "@/lib/api/retired";

export async function POST() {
  return retiredEndpoint({
    feature: "Public style submission",
    replacement: "GitHub issue submissions",
  });
}

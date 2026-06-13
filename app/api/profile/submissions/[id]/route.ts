import { retiredEndpoint } from "@/lib/api/retired";

export async function PATCH() {
  return retiredEndpoint({
    feature: "Profile submission editing",
    replacement: "/styles",
  });
}

export async function DELETE() {
  return retiredEndpoint({
    feature: "Profile submission editing",
    replacement: "/styles",
  });
}

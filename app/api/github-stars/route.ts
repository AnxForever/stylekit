import { NextResponse } from "next/server";

const REPO = "AnxForever/stylekit";

export const revalidate = 1800;

export async function GET() {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "stylekit",
      },
      next: { revalidate },
    });

    if (!response.ok) {
      return NextResponse.json({ stargazers_count: null });
    }

    const data = (await response.json()) as { stargazers_count?: number };
    return NextResponse.json({
      stargazers_count:
        typeof data.stargazers_count === "number" ? data.stargazers_count : null,
    });
  } catch {
    return NextResponse.json({ stargazers_count: null });
  }
}

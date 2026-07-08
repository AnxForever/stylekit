#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repo = process.env.STAR_HISTORY_REPO || "AnxForever/stylekit";
const outputPath =
  process.env.STAR_HISTORY_OUTPUT || "public/readme/star-history.svg";

const dayMs = 24 * 60 * 60 * 1000;
const width = 800;
const height = 460;
const margin = { top: 50, right: 24, bottom: 40, left: 56 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// GitHub-like colors that work on both light and dark backgrounds
const colors = {
  grid: "#30363d",
  text: "#8b949e",
  line: "#58a6ff",
  area: "#58a6ff",
  areaOpacity: "0.08",
  dot: "#58a6ff",
  dotStroke: "#0d1117",
};

function getToken() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) return token;

  try {
    return execFileSync("gh", ["auth", "token"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    throw new Error(
      "GitHub token required. Set GITHUB_TOKEN/GH_TOKEN or run `gh auth login`."
    );
  }
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    timeZone: "UTC",
  }).format(date);
}

function round(value) {
  return Number(value.toFixed(2));
}

function niceStep(value) {
  if (value <= 0) return 1;
  const exponent = Math.floor(Math.log10(value));
  const magnitude = 10 ** exponent;
  const normalized = value / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
}

function getMonthTicks(startDate, endDate) {
  const ticks = [];
  const cursor = new Date(
    Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1)
  );

  if (cursor < startDate) {
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }

  while (cursor <= endDate) {
    ticks.push(new Date(cursor));
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }

  return ticks;
}

async function githubGet(url, token) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.star+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "stylekit-star-history-generator",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body}`);
  }

  return response.json();
}

async function fetchRepo(token) {
  return githubGet(`https://api.github.com/repos/${repo}`, token);
}

async function fetchStargazers(token) {
  const stargazers = [];

  for (let page = 1; ; page += 1) {
    const pageData = await githubGet(
      `https://api.github.com/repos/${repo}/stargazers?per_page=100&page=${page}`,
      token
    );

    if (!Array.isArray(pageData)) {
      throw new Error("GitHub stargazers response was not an array.");
    }

    stargazers.push(...pageData);

    if (pageData.length < 100) break;
  }

  if (stargazers.some((item) => !item.starred_at)) {
    throw new Error(
      "GitHub response did not include starred_at. Check the star+json Accept header."
    );
  }

  return stargazers.sort(
    (a, b) => new Date(a.starred_at).getTime() - new Date(b.starred_at).getTime()
  );
}

// Aggregate individual star events into daily cumulative counts for a smoother curve
function aggregateDaily(stargazers, startDate, endDate) {
  const starTimestamps = stargazers.map((s) =>
    new Date(s.starred_at).getTime()
  );

  const days = [];
  let starIdx = 0;
  let cumulative = 0;

  for (
    let t = startDate.getTime();
    t <= endDate.getTime();
    t += dayMs
  ) {
    while (starIdx < starTimestamps.length && starTimestamps[starIdx] <= t) {
      cumulative += 1;
      starIdx += 1;
    }
    days.push({ date: new Date(t), count: cumulative });
  }

  // Ensure the last point matches total
  if (days.length > 0 && days[days.length - 1].count < stargazers.length) {
    days.push({ date: new Date(endDate), count: stargazers.length });
  }

  return days;
}

function buildSvg({ repoData, stargazers }) {
  const totalStars = Math.max(
    Number(repoData.stargazers_count || 0),
    stargazers.length
  );
  const repoName = repoData.full_name || repo;
  const generatedAt = new Date();
  const firstStarAt = stargazers[0]
    ? new Date(stargazers[0].starred_at)
    : new Date(repoData.created_at);
  const startDate = new Date(
    Math.min(new Date(repoData.created_at).getTime(), firstStarAt.getTime()) -
      dayMs
  );
  const endDate = generatedAt;
  const xSpan = Math.max(endDate.getTime() - startDate.getTime(), dayMs);

  // Aggregate by day for smooth curve
  const dailyData = aggregateDaily(stargazers, startDate, endDate);

  const yMax = totalStars;
  // Use 4-5 horizontal grid lines
  const yStep = niceStep(yMax / 4);
  const yAxisMax = Math.ceil(yMax / yStep) * yStep;

  const x = (date) =>
    margin.left +
    ((new Date(date).getTime() - startDate.getTime()) / xSpan) * chartWidth;
  const y = (count) =>
    margin.top + chartHeight - (Number(count) / yAxisMax) * chartHeight;

  // Build smooth curve path from daily data
  const linePath = dailyData
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command} ${round(x(point.date))} ${round(y(point.count))}`;
    })
    .join(" ");

  const areaPath = `${linePath} L ${round(x(endDate))} ${round(
    y(0)
  )} L ${round(x(startDate))} ${round(y(0))} Z`;

  const yTicks = Array.from(
    { length: Math.floor(yAxisMax / yStep) + 1 },
    (_, index) => Math.round(index * yStep)
  );
  const xTicks = getMonthTicks(startDate, endDate);
  const legendLabel = repoName;

  // Format star count (e.g., "259 stars")
  const starLabel = `${totalStars.toLocaleString()} stars`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(repoName)} Star History</title>
  <desc id="desc">Cumulative GitHub stars for ${escapeXml(repoName)}: ${starLabel} as of ${formatDate(generatedAt)}.</desc>

  <defs>
    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.area}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${colors.area}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Title -->
  <text x="${margin.left}" y="28" fill="${colors.text}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="13" font-weight="600">Star History</text>

  <!-- Legend -->
  <circle cx="${margin.left}" cy="42" r="5" fill="${colors.line}"/>
  <text x="${margin.left + 12}" y="46" fill="${colors.text}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="12">${escapeXml(legendLabel)}</text>

  <!-- Star count badge -->
  <text x="${width - margin.right}" y="28" text-anchor="end" fill="${colors.text}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="13" font-weight="600">${starLabel}</text>

  <!-- Chart area -->
  <g font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="11">
${yTicks
  .map((tick) => {
    const yPos = round(y(tick));
    return `    <line x1="${margin.left}" x2="${width - margin.right}" y1="${yPos}" y2="${yPos}" stroke="${colors.grid}" stroke-width="0.8" stroke-dasharray="3,3"/>
    <text x="${margin.left - 8}" y="${yPos + 4}" text-anchor="end" fill="${colors.text}">${tick}</text>`;
  })
  .join("\n")}
${xTicks
  .map((tick) => {
    const xPos = round(x(tick));
    return `    <line x1="${xPos}" x2="${xPos}" y1="${margin.top}" y2="${margin.top + chartHeight}" stroke="${colors.grid}" stroke-width="0.8" stroke-dasharray="3,3"/>
    <text x="${xPos}" y="${margin.top + chartHeight + 18}" text-anchor="middle" fill="${colors.text}">${formatMonth(tick)}</text>`;
  })
  .join("\n")}
    <!-- X axis -->
    <line x1="${margin.left}" x2="${width - margin.right}" y1="${round(y(0))}" y2="${round(y(0))}" stroke="${colors.grid}" stroke-width="1"/>
    <!-- Area fill -->
    <path d="${areaPath}" fill="url(#areaGrad)"/>
    <!-- Line -->
    <path d="${linePath}" fill="none" stroke="${colors.line}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- End dot -->
    <circle cx="${round(x(endDate))}" cy="${round(y(totalStars))}" r="4" fill="${colors.dotStroke}" stroke="${colors.line}" stroke-width="2"/>
  </g>

  <!-- Footer -->
  <text x="${width - margin.right}" y="${height - 10}" text-anchor="end" fill="${colors.grid}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="9">star-history.com style · updated daily</text>
</svg>
`;
}

async function main() {
  const token = getToken();
  const [repoData, stargazers] = await Promise.all([
    fetchRepo(token),
    fetchStargazers(token),
  ]);
  const svg = buildSvg({ repoData, stargazers });

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, svg, "utf8");

  console.log(
    `Wrote ${outputPath} for ${repoData.full_name} with ${stargazers.length} stargazers.`
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

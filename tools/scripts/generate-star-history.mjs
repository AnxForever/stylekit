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
const height = 500;
const margin = { top: 66, right: 42, bottom: 70, left: 72 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

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

function buildSvg({ repoData, stargazers }) {
  const totalStars = Math.max(
    Number(repoData.stargazers_count || 0),
    stargazers.length
  );
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
  const yStep = niceStep(totalStars / 5);
  const yMax = Math.max(yStep, Math.ceil(totalStars / yStep) * yStep);

  const x = (date) =>
    margin.left +
    ((new Date(date).getTime() - startDate.getTime()) / xSpan) * chartWidth;
  const y = (count) =>
    margin.top + chartHeight - (Number(count) / yMax) * chartHeight;

  const points = [
    { date: startDate, count: 0 },
    ...stargazers.map((item, index) => ({
      date: new Date(item.starred_at),
      count: index + 1,
    })),
    { date: endDate, count: totalStars },
  ];

  const linePath = points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command} ${round(x(point.date))} ${round(y(point.count))}`;
    })
    .join(" ");

  const areaPath = `${linePath} L ${round(x(endDate))} ${round(
    y(0)
  )} L ${round(x(startDate))} ${round(y(0))} Z`;

  const yTicks = Array.from(
    { length: Math.floor(yMax / yStep) + 1 },
    (_, index) => Math.round(index * yStep)
  );
  const xTicks = getMonthTicks(startDate, endDate);
  const title = `${repo} Star History`;
  const subtitle = `${totalStars.toLocaleString()} stars as of ${formatDate(
    generatedAt
  )}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">Cumulative GitHub stars for ${escapeXml(repo)}.</desc>
  <rect width="${width}" height="${height}" rx="18" fill="#ffffff"/>
  <text x="${margin.left}" y="36" fill="#24292f" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="22" font-weight="700">${escapeXml(
    title
  )}</text>
  <text x="${margin.left}" y="58" fill="#57606a" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="13">${escapeXml(
    subtitle
  )}</text>
  <g font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="12">
${yTicks
  .map((tick) => {
    const yPos = round(y(tick));
    return `    <line x1="${margin.left}" x2="${
      width - margin.right
    }" y1="${yPos}" y2="${yPos}" stroke="#d8dee4" stroke-width="1"/>
    <text x="${margin.left - 12}" y="${yPos + 4}" text-anchor="end" fill="#57606a">${tick}</text>`;
  })
  .join("\n")}
${xTicks
  .map((tick) => {
    const xPos = round(x(tick));
    return `    <line x1="${xPos}" x2="${xPos}" y1="${margin.top}" y2="${
      margin.top + chartHeight
    }" stroke="#f0f3f6" stroke-width="1"/>
    <text x="${xPos}" y="${
      margin.top + chartHeight + 30
    }" text-anchor="middle" fill="#57606a">${formatMonth(tick)}</text>`;
  })
  .join("\n")}
    <line x1="${margin.left}" x2="${width - margin.right}" y1="${round(
      y(0)
    )}" y2="${round(y(0))}" stroke="#8c959f" stroke-width="1.4"/>
    <line x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${round(
      y(0)
    )}" stroke="#8c959f" stroke-width="1.4"/>
    <path d="${areaPath}" fill="#ddf4ff"/>
    <path d="${linePath}" fill="none" stroke="#0969da" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${round(x(endDate))}" cy="${round(
      y(totalStars)
    )}" r="4.5" fill="#0969da"/>
    <text x="${width - margin.right}" y="${margin.top - 16}" text-anchor="end" fill="#57606a">GitHub Stars</text>
    <text x="${width - margin.right}" y="${
      height - 18
    }" text-anchor="end" fill="#8c959f">Generated from GitHub stargazers API</text>
  </g>
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
    `Wrote ${outputPath} for ${repo} with ${stargazers.length} stargazers.`
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

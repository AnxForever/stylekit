#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repo = process.env.STAR_HISTORY_REPO || "AnxForever/stylekit";
const outputPath = process.env.STAR_HISTORY_OUTPUT || "public/readme/star-history.svg";
const dayMs = 24 * 60 * 60 * 1000;
const width = 800;
const height = 460;
const margin = { top: 48, right: 24, bottom: 36, left: 56 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

const COLORS = {
  grid: "#30363d",
  text: "#8b949e",
  line: "#58a6ff",
  title: "#c9d1d9",
};
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getToken() {
  const t = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (t) return t;
  try { return execFileSync("gh",["auth","token"],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim(); }
  catch { throw new Error("GitHub token required."); }
}

function esc(v) { return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"); }
function fmt(d) { return d.toISOString().slice(0,10); }
function r(v) { return Number(v.toFixed(2)); }

async function gh(url, token) {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github.star+json", Authorization: `Bearer ${token}`,
      "User-Agent": "stylekit", "X-GitHub-Api-Version": "2022-11-28" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

async function fetchStargazers(token) {
  const all = [];
  for (let p = 1; ; p++) {
    const data = await gh(`https://api.github.com/repos/${repo}/stargazers?per_page=100&page=${p}`, token);
    all.push(...data);
    if (data.length < 100) break;
  }
  return all.sort((a,b) => new Date(a.starred_at).getTime() - new Date(b.starred_at).getTime());
}

function dailyCumulative(stargazers, start, end) {
  const times = stargazers.map(s => new Date(s.starred_at).getTime());
  const points = []; let si = 0, cum = 0;
  for (let t = start.getTime(); t <= end.getTime(); t += dayMs) {
    while (si < times.length && times[si] <= t) { cum++; si++; }
    points.push({ date: new Date(t), count: cum });
  }
  return points;
}

function niceStep(max) {
  if (max <= 0) return 1;
  const m = 10 ** Math.floor(Math.log10(max));
  const n = max / m;
  return n <= 1 ? m : n <= 2 ? 2*m : n <= 5 ? 5*m : 10*m;
}

function monthTicks(start, end) {
  const ticks = [];
  const c = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
  while (c <= end) { ticks.push(new Date(c)); c.setUTCMonth(c.getUTCMonth()+1); }
  return ticks;
}

function buildSvg(repoData, stargazers) {
  const total = Math.max(Number(repoData.stargazers_count||0), stargazers.length);
  const now = new Date();
  const name = repoData.full_name || repo;
  const first = stargazers[0] ? new Date(stargazers[0].starred_at) : new Date(repoData.created_at);
  const start = new Date(Math.min(new Date(repoData.created_at).getTime(), first.getTime()) - dayMs);
  const xSpan = Math.max(now.getTime() - start.getTime(), dayMs);
  const daily = dailyCumulative(stargazers, start, now);
  const yStep = niceStep(total/4);
  const yMax = Math.ceil(total/yStep)*yStep;

  const x = (d) => margin.left + ((new Date(d).getTime() - start.getTime()) / xSpan) * chartWidth;
  const y = (c) => margin.top + chartHeight - (c / yMax) * chartHeight;

  const linePath = daily.map((p,i) => `${i===0?"M":"L"} ${r(x(p.date))} ${r(y(p.count))}`).join(" ");
  const areaPath = `${linePath} L ${r(x(now))} ${r(y(0))} L ${r(x(start))} ${r(y(0))} Z`;

  const yTicks = Array.from({length: Math.floor(yMax/yStep)+1}, (_,i) => Math.round(i*yStep));
  const xTicks = monthTicks(start, now);

  // Comic Sans — the xkcd-look font that works without CSP issues
  const FONT = '"Comic Sans MS", "Comic Sans", cursive, sans-serif';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <title>${esc(name)} Star History</title>
  <defs>
    <filter id="sketch">
      <feTurbulence baseFrequency="0.04" numOctaves="3" result="n" type="fractalNoise"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${COLORS.line}" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="${COLORS.line}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <g filter="url(#sketch)">
    <text x="${margin.left}" y="26" fill="${COLORS.title}" font-family="${FONT}" font-size="15" font-weight="bold">Star History</text>
    <circle cx="${margin.left}" cy="39" r="5" fill="${COLORS.line}"/>
    <text x="${margin.left+12}" y="43" fill="${COLORS.text}" font-family="${FONT}" font-size="12">${esc(name)}</text>
    <text x="${width-margin.right}" y="26" text-anchor="end" fill="${COLORS.title}" font-family="${FONT}" font-size="15" font-weight="bold">${total.toLocaleString()} stars</text>
  </g>

  <g font-family="${FONT}" font-size="11" filter="url(#sketch)">
${yTicks.map(t => {
  const yp = r(y(t));
  return `    <line x1="${margin.left}" x2="${width-margin.right}" y1="${yp}" y2="${yp}" stroke="${COLORS.grid}" stroke-width="1"/>
    <text x="${margin.left-8}" y="${yp+4}" text-anchor="end" fill="${COLORS.text}">${t}</text>`;
}).join("\n")}
${xTicks.map(t => {
  const xp = r(x(t));
  return `    <line x1="${xp}" x2="${xp}" y1="${margin.top}" y2="${margin.top+chartHeight}" stroke="${COLORS.grid}" stroke-width="1"/>
    <text x="${xp}" y="${margin.top+chartHeight+18}" text-anchor="middle" fill="${COLORS.text}">${MONTHS[t.getUTCMonth()]}</text>`;
}).join("\n")}
    <line x1="${margin.left}" x2="${width-margin.right}" y1="${r(y(0))}" y2="${r(y(0))}" stroke="${COLORS.grid}" stroke-width="1.2"/>
  </g>

  <g filter="url(#sketch)">
    <path d="${areaPath}" fill="url(#g)"/>
    <path d="${linePath}" fill="none" stroke="${COLORS.line}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${r(x(now))}" cy="${r(y(total))}" r="5" fill="${COLORS.line}" stroke="#0d1117" stroke-width="2"/>
  </g>

  <text x="${width-margin.right}" y="${height-10}" text-anchor="end" fill="${COLORS.grid}" font-family="sans-serif" font-size="9">updated daily · ${fmt(now)}</text>
</svg>`;
}

async function main() {
  const token = getToken();
  const [repoData, stargazers] = await Promise.all([
    gh(`https://api.github.com/repos/${repo}`, token),
    fetchStargazers(token),
  ]);
  const svg = buildSvg(repoData, stargazers);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, svg, "utf8");
  console.log(`Wrote ${outputPath}: ${stargazers.length} stars for ${repoData.full_name}`);
}

main().catch(e => { console.error(e.message); process.exit(1); });

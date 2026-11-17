// Refreshes assets/stats.svg from the public GitHub API (forks and the profile repo are excluded).
// Run: node scripts/build-stats.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { C, SERIF, esc, est, svg, mono, monoW, nPlus } from './lib.mjs';

const USER = process.env.GH_USER || 'Crusty-chirayu';

async function load() {
  const headers = { 'User-Agent': 'profile-stats', Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
  let all = [];
  for (let p = 1; p <= 5; p++) {
    const r = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&page=${p}&sort=pushed`, { headers });
    if (!r.ok) throw new Error(`GitHub API ${r.status}`);
    const d = await r.json();
    all = all.concat(d);
    if (d.length < 100) break;
  }
  return all;
}

const repos = (await load()).filter((r) => !r.fork && r.name !== USER);
const stars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
const langs = {};
for (const r of repos) if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;
const langList = Object.entries(langs).sort((a, b) => b[1] - a[1]);
const langTotal = langList.reduce((a, [, n]) => a + n, 0) || 1;
const top = langList.slice(0, 4);
const otherN = langList.slice(4).reduce((a, [, n]) => a + n, 0);
if (otherN) top.push(['Other', otherN]);
const colors = [C.cobalt, C.vermilion, C.hl, C.ink, C.paper300];
const recent = [...repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 3);
const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();

const W = 1600, H = 560;
let body = '';
const cells = [
  [nPlus(repos.length), 'PUBLIC REPOSITORIES (OWNED)', C.ink, false],
  [nPlus(stars), 'STARS ON THOSE REPOSITORIES', C.ink, false],
  [langList[0] ? langList[0][0] : '—', 'MOST-USED LANGUAGE', C.cobalt, true],
];
cells.forEach(([big, lab, fill, italic], i) => {
  const x = i * 534;
  const size = italic ? 90 : 150;
  body += `<text x="${x + 6}" y="150" font-family="${SERIF}" font-size="${size}" font-weight="700" ${italic ? 'font-style="italic"' : ''} fill="${fill}" textLength="${est(big, size, italic ? 0.5 : 0.56)}" lengthAdjust="spacingAndGlyphs">${esc(big)}</text>
${mono(x + 6, 198, lab, { size: 18, fill: C.ink500, spacing: 3 })}`;
  if (i < 2) body += `<line x1="${x + 514}" x2="${x + 514}" y1="30" y2="208" stroke="${C.paper300}" stroke-width="3"/>`;
});
body += `<line x1="0" x2="${W}" y1="238" y2="238" stroke="${C.ink}" stroke-width="3"/>
${mono(6, 280, 'LANGUAGES BY REPOSITORY', { size: 18, fill: C.ink500, spacing: 3 })}`;
let bx = 0;
top.forEach(([name, n], i) => {
  const w = Math.max(14, Math.round((n / langTotal) * W));
  body += `<rect x="${bx}" y="296" width="${Math.min(w, W - bx)}" height="30" fill="${colors[i % colors.length]}" stroke="${C.ink}" stroke-width="2.5"/>`;
  bx += w;
});
let lx = 6;
top.forEach(([name, n], i) => {
  const pct = Math.round((n / langTotal) * 100);
  const text = `${name} ${pct}%`;
  body += `<circle cx="${lx + 8}" cy="365" r="8" fill="${colors[i % colors.length]}" stroke="${C.ink}" stroke-width="2"/>${mono(lx + 26, 372, text, { size: 20, spacing: 1, fill: C.ink })}`;
  lx += 26 + monoW(text, 20, 1) + 44;
});
body += `<line x1="0" x2="${W}" y1="410" y2="410" stroke="${C.ink}" stroke-width="3"/>
${mono(6, 452, 'LAST PUSHED', { size: 18, fill: C.ink500, spacing: 3 })}`;
recent.forEach((r, i) => {
  const x = i * 534;
  body += `<text x="${x + 6}" y="502" font-family="${SERIF}" font-size="44" font-weight="700" fill="${C.ink}" textLength="${Math.min(est(r.name, 44, 0.52), 480)}" lengthAdjust="spacingAndGlyphs">${esc(r.name)}</text>
${mono(x + 6, 534, fmt(r.pushed_at), { size: 18, fill: C.ink500, spacing: 3 })}`;
});
mkdirSync('assets', { recursive: true });
writeFileSync('assets/stats.svg', svg(W, H, body, {
  title: 'GitHub by the numbers',
  desc: `${nPlus(repos.length)} owned public repositories, ${nPlus(stars)} stars, most used language ${langList[0]?.[0] ?? 'n/a'}. Counts exclude forks.`,
}));
console.log('wrote assets/stats.svg', { repos: repos.length, stars, top: langList.slice(0, 3) });
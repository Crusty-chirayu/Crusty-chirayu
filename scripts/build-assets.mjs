// Generates every SVG in /assets (except stats.svg, which build-stats.mjs refreshes daily).
// Run:  node scripts/build-assets.mjs
// Edit the CONFIG and the data blocks below, run again, commit the new SVGs.
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { C, SERIF, MONO, HAND, esc, est, svg, mono, monoW } from './lib.mjs';

const CONFIG = {
  fullName: 'Chirayu Babu Jaysawal',
  site: 'https://chirayu.dpdns.org',        // <- your portfolio
  siteLabel: 'chirayu.dpdns.org',
  github: 'https://github.com/Crusty-chirayu',
  linkedin: 'https://www.linkedin.com/in/chirayu-babu-jaysawal/',
  email: 'chirayujayaswal7@gmail.com',
  portrait: 'assets/src/portrait.png',     // optional transparent cut-out of you; the arch shows a monogram if missing
};

mkdirSync('assets', { recursive: true });
const out = (name, content) => { writeFileSync(`assets/${name}`, content); console.log('wrote assets/' + name, (content.length / 1024).toFixed(1) + ' KB'); };

/* ----------------------------------------------------------------- BANNER */
function banner() {
  const W = 1600, H = 720;
  const tapeItems = ['TYPESCRIPT', 'NEXT.JS', 'REACT', 'FASTIFY', 'FASTAPI', 'SUPABASE', 'POSTGRESQL', 'THREE.JS', 'MAPLIBRE GL', 'DOCKER', 'PLAYWRIGHT', 'AI AGENTS'];
  const tapeStr = tapeItems.join(' / ') + ' /\u00A0';
  const size = 24, spacing = 3, adv = size * 0.6 + spacing;
  const period = Math.round(tapeStr.length * adv);
  const tapeText = (x) => mono(x, 681, tapeStr, { size, spacing, fill: C.ink, weight: 500 });

  const hasPortrait = existsSync(CONFIG.portrait);
  if (hasPortrait && readFileSync(CONFIG.portrait).length > 300 * 1024) console.warn('WARNING: portrait is over 300 KB; resize it (about 600x700) so the banner stays light.');
  const portrait = hasPortrait
    ? `<clipPath id="arch"><path d="M1070 612 V382 A210 210 0 0 1 1490 382 V612 Z"/></clipPath>
<image href="data:image/png;base64,${readFileSync(CONFIG.portrait).toString('base64')}" x="1070" y="150" width="420" height="462" preserveAspectRatio="xMidYMax slice" clip-path="url(#arch)"/>`
    : `<text x="1280" y="528" font-family="${SERIF}" font-size="340" font-weight="700" font-style="italic" fill="${C.paper}" text-anchor="middle">C</text>`;
  const note = hasPortrait ? 'that’s me (probably)' : 'the C is for Chirayu';

  const body = `
<defs>
  <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="2.2" fill="${C.paper}" fill-opacity=".2"/></pattern>
</defs>
<rect width="${W}" height="${H}" fill="${C.paper}"/>
<rect x="2" y="2" width="${W - 4}" height="${H - 4}" fill="none" stroke="${C.ink}" stroke-width="4"/>

<!-- masthead -->
${mono(56, 47, 'VOL. 01 / BENGALURU / 2026', { size: 21, fill: C.ink })}
${mono(W - 56, 47, 'AI & FULL-STACK DEVELOPER', { size: 21, fill: C.ink, anchor: 'end' })}
<line x1="2" x2="${W - 2}" y1="76" y2="76" stroke="${C.ink}" stroke-width="3"/>

<!-- headline -->
<text x="52" y="275" font-family="${SERIF}" font-size="176" font-weight="700" fill="${C.ink}" textLength="800" lengthAdjust="spacingAndGlyphs">I imagine</text>
<text x="52" y="450" font-family="${SERIF}" font-size="176" font-weight="700" fill="${C.ink}" textLength="930" lengthAdjust="spacingAndGlyphs">what’s <tspan font-style="italic" fill="${C.cobalt}">next.</tspan></text>

<!-- deck with marker highlight -->
<rect x="596" y="506" width="262" height="60" fill="${C.hl}"/>
<text x="56" y="548" font-family="${SERIF}" font-size="46" fill="${C.ink700}" textLength="522" lengthAdjust="spacingAndGlyphs">Then I engineer it into</text>
<text x="608" y="550" font-family="${SERIF}" font-size="46" font-weight="700" fill="${C.ink}" textLength="238" lengthAdjust="spacingAndGlyphs">existence.</text>
${mono(56, 620, 'B.E. COMPUTER ENGINEERING / BENGALURU, INDIA', { size: 19, fill: C.ink500 })}

<!-- arch portrait -->
<path d="M1070 612 V382 A210 210 0 0 1 1490 382 V612 Z" fill="${C.cobalt}"/>
<path d="M1070 612 V382 A210 210 0 0 1 1490 382 V612 Z" fill="url(#dots)"/>
${portrait}
<path d="M1070 612 V382 A210 210 0 0 1 1490 382 V612 Z" fill="none" stroke="${C.ink}" stroke-width="4"/>

<!-- sticker -->
<g transform="translate(1262 176) rotate(7)">
  <rect x="6" y="6" width="272" height="50" fill="${C.ink}"/>
  <rect width="272" height="50" fill="${C.hl}" stroke="${C.ink}" stroke-width="3"/>
  ${mono(136, 33, 'AI + FULL-STACK', { size: 21, fill: C.ink, anchor: 'middle', weight: 700 })}
</g>

<!-- margin note -->
<g transform="rotate(-4 860 135)">
  <text x="850" y="132" font-family="${HAND}" font-size="38" fill="${C.vermilionInk}">${esc(note)}</text>
</g>
<path d="M1166 126 C1218 130 1226 168 1186 192" fill="none" stroke="${C.vermilionInk}" stroke-width="3.5" stroke-linecap="round"/>
<path d="M1186 192 l-2 -16 M1186 192 l-15 -6" fill="none" stroke="${C.vermilionInk}" stroke-width="3.5" stroke-linecap="round"/>

<!-- scrolling tape -->
<g transform="rotate(-1.2 800 671)">
  <rect x="-80" y="640" width="${W + 160}" height="62" fill="${C.vermilion}" stroke="${C.ink}" stroke-width="3"/>
  <g class="tape">${tapeText(-40)}${tapeText(-40 + period)}</g>
</g>`;
  const style = `.tape{animation:slide 75s linear infinite}@keyframes slide{to{transform:translateX(-${period}px)}}`;
  out('banner.svg', svg(W, H, body, {
    title: 'Chirayu — I imagine what’s next. Then I engineer it into existence.',
    desc: 'Editorial masthead for Chirayu Babu Jaysawal, AI and full-stack developer in Bengaluru, with a scrolling strip of technologies.',
    style,
  }));
}

/* ------------------------------------------------------- SECTION LABELS */
function label(file, folio, plain, accent, right) {
  const W = 1600, H = 140, PAD = 32;
  const total = plain + ' ' + accent;
  const L = est(total, 84, 0.5);
  const body = `<g transform="translate(${PAD} 0)">
${mono(6, 38, folio, { size: 20, fill: C.ink500, spacing: 4 })}
${mono(W - 6, 38, right, { size: 20, fill: C.ink500, spacing: 4, anchor: 'end' })}
<text x="2" y="108" font-family="${SERIF}" font-size="84" font-weight="700" fill="${C.ink}" textLength="${L}" lengthAdjust="spacingAndGlyphs">${esc(plain)} <tspan font-style="italic" fill="${C.cobalt}">${esc(accent)}</tspan></text>
<line x1="0" x2="${W}" y1="128" y2="128" stroke="${C.ink}" stroke-width="3"/>
<rect x="0" y="122" width="140" height="12" fill="${C.vermilion}"/></g>`;
  out(file, svg(W + PAD * 2, H, body, { title: `${plain} ${accent}`, bg: C.paper }));
}

/* --------------------------------------------------------- PROJECT CARDS */
function card(file, { n, cat, name, status, statusColor, lines, chips, host }) {
  const W = 800, H = 424;
  let cx = 32, chipSvg = '';
  for (const c of chips) {
    const w = monoW(c, 20, 0) + 32;
    chipSvg += `<rect x="${cx}" y="302" width="${w}" height="42" rx="21" fill="none" stroke="${C.ink}" stroke-width="2.5"/>${mono(cx + w / 2, 330, c, { size: 20, spacing: 0, anchor: 'middle', fill: C.ink })}`;
    cx += w + 10;
  }
  const lineSvg = lines.map((t, i) => `<text x="32" y="${200 + i * 36}" font-family="${SERIF}" font-size="27" fill="${C.ink700}">${esc(t)}</text>`).join('\n');
  const nameL = est(name, 76, 0.52);
  const body = `
<rect x="14" y="14" width="780" height="400" fill="${C.ink}"/>
<rect x="2" y="2" width="780" height="400" fill="${C.paper50}" stroke="${C.ink}" stroke-width="4"/>
${mono(32, 58, `${n} / ${cat}`, { size: 20, fill: C.ink500 })}
<circle cx="${752 - monoW(status, 20)  - 22}" cy="51" r="8" fill="${statusColor}"/>
${mono(752, 58, status, { size: 20, fill: statusColor, anchor: 'end', weight: 500 })}
<text x="30" y="150" font-family="${SERIF}" font-size="76" font-weight="700" fill="${C.ink}" textLength="${nameL}" lengthAdjust="spacingAndGlyphs">${esc(name)}</text>
${lineSvg}
${chipSvg}
${mono(32, 384, host, { size: 18, fill: C.ink500 })}
<line x1="32" x2="752" y1="364" y2="364" stroke="${C.paper300}" stroke-width="2"/>`;
  out(file, svg(W, H, body, { title: `${name} — ${cat.toLowerCase()}`, desc: lines.join(' ') }));
}

/* --------------------------------------------------------------- TOOLBOX */
function toolbox() {
  const groups = [
    ['01 / LANGUAGES', ['TypeScript', 'JavaScript', 'Java', 'Python', 'C', 'C++', 'SQL']],
    ['02 / FRONTEND', ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Motion', 'Three.js', 'MapLibre GL']],
    ['03 / BACKEND', ['Node.js', 'Express', 'Fastify', 'FastAPI', 'REST', 'WebSockets', 'Socket.IO']],
    ['04 / DATA', ['PostgreSQL', 'MongoDB', 'SQLite', 'Supabase', 'Neon']],
    ['05 / AI & MEDIA', ['Claude', 'Gemini', 'Groq', 'Cerebras', 'OpenCV', 'ComfyUI', 'WAN', 'Kling', 'Luma']],
    ['06 / DELIVERY', ['Docker', 'Vercel', 'Render', 'Playwright', 'Git']],
  ];
  const colW = 500, gap = 50, W = 1600;
  let body = '';
  const heights = groups.map(([, items]) => {
    let x = 0, y = 0, lines = 1;
    for (const t of items) {
      const w = monoW(t, 20, 0) + 32;
      if (x + w > colW) { x = 0; y += 54; lines++; }
      x += w + 10;
    }
    return 50 + lines * 54;
  });
  const rows = [Math.max(heights[0], heights[1], heights[2]), Math.max(heights[3], heights[4], heights[5])];
  const H = rows[0] + rows[1] + 30 + 24;
  groups.forEach(([title, items], i) => {
    const gx = (i % 3) * (colW + gap) + 0;
    const gy = i < 3 ? 0 : rows[0] + 30;
    body += `<g transform="translate(${gx} ${gy})">
${mono(0, 24, title, { size: 20, fill: C.ink500, spacing: 3 })}
<line x1="0" x2="${colW}" y1="38" y2="38" stroke="${C.ink}" stroke-width="2.5"/>`;
    let x = 0, y = 56;
    items.forEach((t, k) => {
      const w = monoW(t, 20, 0) + 32;
      if (x + w > colW) { x = 0; y += 54; }
      const filled = k === 0;
      body += `<rect x="${x}" y="${y}" width="${w}" height="42" rx="21" fill="${filled ? C.ink : C.paper50}" stroke="${C.ink}" stroke-width="2.5"/>${mono(x + w / 2, y + 28, t, { size: 20, spacing: 0, anchor: 'middle', fill: filled ? C.paper : C.ink })}`;
      x += w + 10;
    });
    body += '</g>';
  });
  out('toolbox.svg', svg(W + 64, H + 56, `<g transform="translate(32 28)">${body}</g>`, { title: 'The toolbox: languages, frontend, backend, data, AI and media, delivery', desc: groups.map(([t, it]) => t + ': ' + it.join(', ')).join('. '), bg: C.paper }));
}

/* ------------------------------------------------------- OFF THE CLOCK */
function clippings() {
  const W = 1600, H = 400;
  const clips = [
    { x: 30, rot: -1.6, label: 'FREELANCE / SINCE 2022', title: 'AI visual work', lines: ['Animation, images, video and', 'posters for clients on Fiverr,', 'Upwork, Freelancer and direct.'] },
    { x: 560, rot: 1.3, label: 'WRITING', title: 'Blog.me', lines: ['Software, AI architecture and', 'personal reflections, on a blog', 'I built and publish myself.'] },
    { x: 1090, rot: -0.9, label: 'AWAY FROM THE SCREEN', title: 'Trails & tents', lines: ['Trekking, cycling, camping and', 'nature. Doodling. Metal music.', ''] },
  ];
  let body = '';
  for (const c of clips) {
    const w = 480, h = 290, y = 58;
    body += `<g transform="rotate(${c.rot} ${c.x + w / 2} ${y + h / 2})">
<rect x="${c.x + 10}" y="${y + 10}" width="${w}" height="${h}" fill="${C.ink}"/>
<rect x="${c.x}" y="${y}" width="${w}" height="${h}" fill="${C.paper50}" stroke="${C.ink}" stroke-width="3.5"/>
<rect x="${c.x + w / 2 - 60}" y="${y - 20}" width="120" height="36" fill="${C.hl}" fill-opacity=".85" transform="rotate(-3 ${c.x + w / 2} ${y})"/>
${mono(c.x + 28, y + 62, c.label, { size: 18, fill: C.ink500 })}
<text x="${c.x + 26}" y="${y + 128}" font-family="${SERIF}" font-size="56" font-weight="700" fill="${C.ink}" textLength="${est(c.title, 56, 0.5)}" lengthAdjust="spacingAndGlyphs">${esc(c.title)}</text>
${c.lines.map((t, i) => `<text x="${c.x + 28}" y="${y + 182 + i * 36}" font-family="${SERIF}" font-size="25" fill="${C.ink700}">${esc(t)}</text>`).join('')}
</g>`;
  }
  out('clippings.svg', svg(W, H, body, { title: 'Off the clock: freelance AI visual work, writing, and time outdoors', desc: clips.map((c) => `${c.title}: ${c.lines.join(' ')}`).join(' '), bg: C.paper }));
}

/* --------------------------------------------------------------- TICKET */
function ticket() {
  const W = 1600, H = 360;
  const rows = [['EMAIL', CONFIG.email], ['GITHUB', 'github.com/Crusty-chirayu'], ['LINKEDIN', 'in/chirayu-babu-jaysawal'], ['SITE', CONFIG.siteLabel]];
  const body = `
<rect x="52" y="40" width="1520" height="290" fill="${C.ink}"/>
<rect x="40" y="28" width="1520" height="290" fill="${C.paper50}" stroke="${C.ink}" stroke-width="4"/>
<circle cx="92" cy="173" r="14" fill="${C.paper200}" stroke="${C.ink}" stroke-width="3"/>
${mono(130, 92, 'ADMIT ONE / CONVERSATIONS WELCOME', { size: 20, fill: C.ink500, spacing: 3 })}
<text x="126" y="220" font-family="${SERIF}" font-size="132" font-weight="700" fill="${C.ink}" textLength="760" lengthAdjust="spacingAndGlyphs">Say <tspan font-style="italic" fill="${C.vermilion}">hello.</tspan></text>
<text x="130" y="272" font-family="${SERIF}" font-size="31" fill="${C.ink700}">Hiring, collaborating or just curious: I read every message.</text>
<line x1="1000" x2="1000" y1="44" y2="302" stroke="${C.ink}" stroke-width="3" stroke-dasharray="3 12" stroke-linecap="round"/>
${rows.map(([k, v], i) => `${mono(1040, 82 + i * 62, k, { size: 17, fill: C.ink500, spacing: 3 })}${mono(1040, 82 + i * 62 + 28, v, { size: 24, spacing: 0, fill: C.ink, weight: 500 })}`).join('\n')}`;
  out('ticket.svg', svg(W, H, body, { title: 'Contact ticket: say hello', desc: rows.map(([k, v]) => `${k}: ${v}`).join('. '), bg: C.paper }));
}

/* -------------------------------------------------------------- BUTTONS */
function button(file, text, { fill, color, stroke = C.ink }) {
  const W = 300, H = 76;
  const body = `
<rect x="6" y="8" width="288" height="64" rx="32" fill="${C.ink}"/>
<rect x="2" y="2" width="288" height="64" rx="32" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
${mono(146, 43, text, { size: 22, spacing: 1, anchor: 'middle', fill: color, weight: 700 })}`;
  out(file, svg(W, H, body, { title: text }));
}

/* --------------------------------------------------------------- FOOTER */
function footer() {
  const W = 1600, H = 230;
  const body = `
<rect width="${W}" height="${H}" fill="${C.ink}"/>
<rect width="${W}" height="10" fill="${C.vermilion}"/>
<text x="48" y="124" font-family="${SERIF}" font-size="92" font-weight="700" fill="${C.paper}" textLength="${est('Thanks for reading.', 92, 0.5)}" lengthAdjust="spacingAndGlyphs">Thanks for <tspan font-style="italic" fill="${C.hl}">reading.</tspan></text>
${mono(48, 186, 'SET IN GEORGIA & MONO / DRAWN BY HAND IN SVG / BENGALURU', { size: 19, fill: C.ink300, spacing: 3 })}
${mono(W - 48, 186, '© 2026 CHIRAYU BABU JAYSAWAL', { size: 19, fill: C.ink300, spacing: 3, anchor: 'end' })}`;
  out('footer.svg', svg(W, H, body, { title: 'Thanks for reading. Chirayu Babu Jaysawal, Bengaluru, 2026.' }));
}

/* ================================================================== RUN */
banner();
label('h-now.svg', '— 01 —', 'Now', 'building', 'SELECTED WORK');
label('h-toolbox.svg', '— 02 —', 'The', 'toolbox', 'WHAT I BUILD WITH');
label('h-numbers.svg', '— 03 —', 'By the', 'numbers', 'REFRESHED DAILY');
label('h-clock.svg', '— 04 —', 'Off the', 'clock', 'THE OTHER HALF');
label('h-elsewhere.svg', '— 05 —', 'Find me', 'elsewhere', 'GET IN TOUCH');

card('card-envoy.svg', { n: '01', cat: 'AGENTIC AI PLATFORM', name: 'Envoy', status: 'LIVE / V1', statusColor: C.amber, lines: ['Open-source AI agent platform for free,', 'market-tailored resumes, CVs and', 'portfolios.'], chips: ['Next.js', 'Fastify', 'Supabase', 'AI agents'], host: 'envoy-i02z.onrender.com' });
card('card-cartiq.svg', { n: '02', cat: 'AI E-COMMERCE', name: 'CartIQ', status: 'LIVE', statusColor: C.forest, lines: ['Conversational shopping assistant wired to', 'a live Supabase catalog, with voice input,', 'chat history and an admin dashboard.'], chips: ['Next.js', 'TypeScript', 'Supabase', 'OpenRouter'], host: 'cartiq-five.vercel.app' });
card('card-aeroloom.svg', { n: '03', cat: 'REAL-TIME FLIGHT MAP', name: 'Aeroloom', status: 'LIVE', statusColor: C.forest, lines: ['Real-time ADS-B flight tracker with editorial', 'cartography, MapLibre GL and live aircraft', 'telemetry over WebSockets.'], chips: ['Next.js', 'MapLibre GL', 'WebSockets'], host: 'aeroloom-five.vercel.app' });
card('card-confluence.svg', { n: '04', cat: 'AI GROUP CHAT', name: 'Confluence', status: 'LIVE / SOLO', statusColor: C.forest, lines: ['Full-stack real-time group chat with AI', 'integrated into the conversation.', 'Designed and built solo.'], chips: ['TypeScript', 'Real-time', 'Integrated AI'], host: 'group-chatbot-ruby.vercel.app' });
card('card-trailmate.svg', { n: '05', cat: 'OUTDOOR TRIP PLANNER', name: 'TrailMate', status: 'LIVE / V1', statusColor: C.forest, lines: ['GPS trail tracking, route analytics, GPX tools,', 'offline support and trail sharing, on Supabase', 'Postgres with row-level security.'], chips: ['Next.js', 'TypeScript', 'Supabase', 'GPX'], host: 'trailmate-zeta.vercel.app' });
card('card-aaragate.svg', { n: '06', cat: 'AI GATE PREPARATION', name: 'AARAGATE', status: 'LIVE / SOLO', statusColor: C.forest, lines: ['AI tutor and batch study rooms for GATE', 'preparation, with streaming chat.', 'Designed and built solo.'], chips: ['TypeScript', 'AI tutor', 'Study rooms'], host: 'aaragate.onrender.com' });

toolbox();
clippings();
ticket();
button('btn-site.svg', 'PORTFOLIO ↗', { fill: C.ink, color: C.paper, stroke: C.paper });
button('btn-github.svg', 'GITHUB ↗', { fill: C.paper50, color: C.ink });
button('btn-linkedin.svg', 'LINKEDIN ↗', { fill: C.paper50, color: C.ink });
button('btn-email.svg', 'EMAIL ME ↗', { fill: C.hl, color: C.ink });
footer();
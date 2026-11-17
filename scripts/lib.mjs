// Shared design tokens + helpers for the profile README assets.
// Same language as the portfolio: paper, ink, serif display type, one loud accent.
export const C = {
  paper: '#F4EFE6', paper50: '#FBF8F2', paper200: '#EBE4D6', paper300: '#D9D1C3',
  ink: '#14110F', ink700: '#4A433C', ink500: '#6B6259', ink300: '#BBB2A4',
  cobalt: '#1F3BFF', vermilion: '#F0481E', vermilionInk: '#C2360F',
  hl: '#FFE45C', forest: '#1F7A4D', amber: '#B26A00',
};
const preview = process.env.PREVIEW === '1'; // local render check only
export const SERIF = (preview ? "'Latin Modern Roman', " : '') + "Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif";
export const MONO = (preview ? "'Latin Modern Mono', " : '') + "ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', 'DejaVu Sans Mono', monospace";
export const HAND = "'Bradley Hand', 'Segoe Script', 'Comic Sans MS', 'Comic Neue', cursive";

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const est = (text, size, ratio) => Math.round(text.length * size * ratio);
export const MONO_W = 0.6; // advance width (em) we force with textLength so layout never depends on the viewer's font

// "N+" style numbers (no exact counts for open-ended collections).
export const nPlus = (n) => (n < 10 ? `${n}+` : `${Math.floor(n / 5) * 5}+`);

export function svg(w, h, body, { title, desc, style = '', bg = null } = {}) {
  const id = 't' + Math.abs([...(title || 'x')].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="${id}">
<title id="${id}">${esc(title || '')}</title>${desc ? `<desc>${esc(desc)}</desc>` : ''}
<style>${style}
@media (prefers-reduced-motion: reduce){*{animation:none !important}}</style>
${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}
${body}
</svg>
`;
}

// Fixed-advance mono text so chips / tape / labels always measure the same.
export function mono(x, y, text, { size = 20, fill = C.ink, anchor = 'start', spacing = 2, weight = 400, extra = '' } = {}) {
  const adv = size * MONO_W + spacing;
  const len = Math.round(text.length * adv - spacing);
  return `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" textLength="${len}" lengthAdjust="spacing" ${extra}>${esc(text)}</text>`;
}
export const monoW = (text, size = 20, spacing = 2) => Math.round(text.length * (size * MONO_W + spacing) - spacing);
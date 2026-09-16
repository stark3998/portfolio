// Build-time transform: convert the standalone FTD artifact HTML documents into
// portfolio-native, in-app renderable assets.
//
// For each artifact it emits, into src/content/ftd/<slug>.*:
//   - .html  : inner body content (chrome removed), ready to render in-app
//   - .css   : the artifact stylesheet, re-hued purple -> azure/teal, refonted,
//              and scoped under `.ftd-doc` so it cannot leak into the portfolio
//   - .js    : the artifact's own interaction scripts (tabs, modals, citations)
//   - .cite.json : the citation data map (client-identifying labels neutralized)
//
// Run with: npm run build-ftd
import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

const REPO = process.cwd();
const OUT = path.join(REPO, "src", "content", "ftd");

const artifacts = [
  {
    slug: "frontier-threat-defense-kill-chain",
    file: "public/artifacts/frontier-threat-defense-kill-chain.html",
  },
  {
    slug: "frontier-threat-defense-program-strategy",
    file: "public/artifacts/frontier-threat-defense-program-strategy.html",
  },
];

/* ----------------------------- colour re-hue ----------------------------- */
// Portfolio palette anchors.
const AZURE = "#0078d4";
const EXACT = {
  "5e24a3": "0078d4", // --brand            purple -> azure
  "341459": "0b2740", // --brand-dk         deep purple ground -> deep slate-azure
  "241638": "071726", // darker purple ground
  "8b5ac4": "22d3ee", // light purple accent -> teal
  "6b2fb5": "0090e8", // purple variant -> azure variant
};

function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
function rgbToHex(r, g, b) {
  const c = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return [h, s, l];
}
function hslToRgb(h, s, l) {
  h /= 360;
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    hue2rgb(p, q, h + 1 / 3) * 255,
    hue2rgb(p, q, h) * 255,
    hue2rgb(p, q, h - 1 / 3) * 255,
  ];
}

// Re-hue a single hex: purple/violet family -> azure, preserving lightness &
// saturation. Reds (breach), greens (control), ambers and near-neutrals are
// left untouched so the document's semantic colour coding survives.
const AZURE_HUE = 205;
function rehue(hex) {
  const key = hex.replace("#", "").toLowerCase();
  if (EXACT[key]) return `#${EXACT[key]}`;
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const isPurple = h >= 248 && h <= 320 && s > 0.18;
  if (!isPurple) return hex;
  const [nr, ng, nb] = hslToRgb(AZURE_HUE, s, l);
  return rgbToHex(nr, ng, nb);
}

function themeColors(css) {
  let out = css.replace(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g, (m) => rehue(m));
  // rgb()/rgba() purples -> azure, preserving alpha; reds/greens/etc untouched.
  out = out.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/g,
    (full, r, g, b, a) => {
      const [h, s, l] = rgbToHsl(+r, +g, +b);
      const isPurple = h >= 248 && h <= 320 && s > 0.18;
      if (!isPurple) return full;
      const [nr, ng, nb] = hslToRgb(AZURE_HUE, s, l);
      const R = Math.round(nr), G = Math.round(ng), B = Math.round(nb);
      return a !== undefined ? `rgba(${R}, ${G}, ${B}, ${a})` : `rgb(${R}, ${G}, ${B})`;
    });
  return out;
}

/* --------------------------- selector scoping ---------------------------- */
const SCOPE = "ftd-doc";

const scoper = selectorParser((root) => {
  root.each((selector) => {
    const first = selector.first;
    if (!first) return;

    // :root  ->  .ftd-doc
    if (first.type === "pseudo" && first.value === ":root") {
      first.replaceWith(selectorParser.className({ value: SCOPE }));
      return;
    }
    // *  ->  .ftd-doc *
    if (first.type === "universal") {
      selector.prepend(selectorParser.combinator({ value: " " }));
      selector.prepend(selectorParser.className({ value: SCOPE }));
      return;
    }
    // html / body leading tag -> .ftd-doc  (but keep body.mdl-open global so
    // the JS that toggles overflow on <body> still works)
    if (first.type === "tag" && (first.value === "html" || first.value === "body")) {
      let hasMdlOpen = false;
      for (const n of selector.nodes) {
        if (n.type === "combinator") break;
        if (n.type === "class" && n.value === "mdl-open") hasMdlOpen = true;
      }
      if (first.value === "body" && hasMdlOpen) return; // leave global
      first.replaceWith(selectorParser.className({ value: SCOPE }));
      return;
    }
    // default: descendant-scope
    selector.prepend(selectorParser.combinator({ value: " " }));
    selector.prepend(selectorParser.className({ value: SCOPE }));
  });
});

function scopeCss(css) {
  const root = postcss.parse(css);
  root.walkRules((rule) => {
    if (
      rule.parent &&
      rule.parent.type === "atrule" &&
      /keyframes/i.test(rule.parent.name)
    ) {
      return; // don't touch keyframe step selectors
    }
    rule.selector = scoper.processSync(rule.selector);
  });
  return root.toString();
}

/* -------------------- portfolio palette variable overrides ---------------- */
const VAR_OVERRIDES = `
/* Portfolio palette + typography overrides (Refined Azure) */
.ftd-doc{
  --serif:var(--font-jetbrains-mono),'JetBrains Mono',ui-monospace,monospace;
  --sans:var(--font-inter),Inter,system-ui,-apple-system,'Segoe UI',sans-serif;
  --mono:var(--font-jetbrains-mono),'JetBrains Mono',ui-monospace,monospace;
  --brand:#0078D4; --brand-dk:#0b2740; --brand-wash:#E8F4FD; --brand-rule:#BAE0FB;
  --held:#0078D4; --held-wash:#E8F4FD; --held-rule:#BAE0FB;
  background:transparent;
}
/* headings use the portfolio heading font; body stays Inter */
.ftd-doc h1,.ftd-doc h2,.ftd-doc h3,.ftd-doc h4,.ftd-doc h5{font-family:var(--serif)}
/* the document sets its own body font-size on the scope root; keep it readable */
.ftd-doc{font-size:16.5px}
/* modal-open scroll lock (rule was scoped away from <body>) */
body.mdl-open{overflow:hidden}
/* sit the document's sticky tab bar just below the portfolio navbar (64px) */
.ftd-doc .tabbar{top:64px}
.ftd-doc{scroll-padding-top:110px}
/* keep tab pills at natural width so the bar scrolls instead of clipping labels */
.ftd-doc .pill{flex:0 0 auto}
`;

/* ----------------------------- body extraction --------------------------- */
// Remove a balanced <div class="X">...</div> (or <tag>) starting at first match.
function removeBalanced(html, openTagRegex, tagName = "div") {
  const m = openTagRegex.exec(html);
  if (!m) return html;
  const start = m.index;
  let i = m.index + m[0].length;
  let depth = 1;
  const open = new RegExp(`<${tagName}\\b`, "gi");
  const close = new RegExp(`</${tagName}>`, "gi");
  while (depth > 0 && i < html.length) {
    open.lastIndex = i; close.lastIndex = i;
    const o = open.exec(html);
    const c = close.exec(html);
    if (!c) break;
    if (o && o.index < c.index) { depth++; i = o.index + o[0].length; }
    else { depth--; i = c.index + c[0].length; }
  }
  return html.slice(0, start) + html.slice(i);
}

function extractBody(html) {
  let body = /<body[^>]*>([\s\S]*)<\/body>/i.exec(html)[1];
  body = body.replace(/<style[\s\S]*?<\/style>/gi, "");
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  body = body.replace(/<div class="brand-rule">\s*<\/div>/i, "");
  body = removeBalanced(body, /<div class="topbar">/i, "div");
  body = removeBalanced(body, /<footer[^>]*>/i, "footer");
  return body.trim();
}

/* ------------------------------- scripts --------------------------------- */
function extractScripts(html) {
  const scripts = [
    ...html.matchAll(/<script(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/gi),
  ].map((m) => m[1]);
  return scripts.join("\n;\n");
}

function extractCite(html) {
  const m = /<script[^>]*id="citeData"[^>]*>([\s\S]*?)<\/script>/i.exec(html);
  return m ? m[1].trim() : "{}";
}

/* --------------------- citeData client-data neutralizing ------------------ */
function neutralizeCite(json) {
  let s = json;
  // Neutralize verbatim SEC-filing source attributions.
  s = s.replace(
    /the enterprise FY2025 Form 10-K[^"]*/g,
    "Illustrative public-company SEC 10-K cyber-risk disclosure"
  );
  s = s.replace(/the enterprise Form 10-K[^"]*/g, "Illustrative public-company SEC 10-K disclosure");
  s = s.replace(/Form 10-K/g, "SEC 10-K (illustrative)");
  return s;
}

/* --------------------------------- run ----------------------------------- */
fs.mkdirSync(OUT, { recursive: true });

for (const art of artifacts) {
  const html = fs.readFileSync(path.join(REPO, art.file), "utf8");

  const rawCss = /<style[^>]*>([\s\S]*?)<\/style>/i.exec(html)[1];
  const themedCss = themeColors(rawCss);
  const scopedCss = scopeCss(themedCss) + "\n" + VAR_OVERRIDES;

  const body = extractBody(html);
  const scripts = extractScripts(html);
  const cite = neutralizeCite(extractCite(html));

  fs.writeFileSync(path.join(OUT, `${art.slug}.html`), body);
  fs.writeFileSync(path.join(OUT, `${art.slug}.css`), scopedCss);
  fs.writeFileSync(path.join(OUT, `${art.slug}.js`), scripts);
  fs.writeFileSync(path.join(OUT, `${art.slug}.cite.json`), cite);

  console.log(
    `built ${art.slug}: html ${body.length}b, css ${scopedCss.length}b, js ${scripts.length}b, cite ${cite.length}b`
  );
}

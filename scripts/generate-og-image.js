#!/usr/bin/env node

/**
 * Generates social/branding raster images as real PNG files in public/:
 *   - og-image.png    (1200×630)  Open Graph / Twitter card
 *   - icon.png        (512×512)   favicon / PWA icon
 *   - apple-icon.png  (180×180)   Apple touch icon
 *
 * Real .png files (rather than Next.js metadata image routes) are used so
 * that a static export served from GitHub Pages returns the correct
 * image/png content-type — social crawlers reject extensionless assets.
 *
 * Uses `sharp` (bundled with Next.js) to rasterize inline SVG.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outputDir = path.join(__dirname, "../public");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0078D4"/>
      <stop offset="55%" stop-color="#005A9E"/>
      <stop offset="100%" stop-color="#00BCD4"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <g transform="translate(80,150)">
    <rect x="0" y="-8" width="56" height="56" rx="14" fill="rgba(255,255,255,0.18)"/>
    <text x="28" y="26" font-size="30" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">JM</text>
    <text x="80" y="24" font-size="30" font-weight="600" fill="rgba(255,255,255,0.9)" font-family="Arial, Helvetica, sans-serif">Identity &#183; Security &#183; Azure</text>
  </g>
  <text x="80" y="330" font-size="92" font-weight="800" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" letter-spacing="-2">Jatin Madan</text>
  <text x="80" y="405" font-size="38" font-weight="500" fill="rgba(255,255,255,0.92)" font-family="Arial, Helvetica, sans-serif">Engineering Manager 2 &#183; Enterprise AI Program Architect</text>
  <text x="80" y="460" font-size="26" fill="rgba(255,255,255,0.75)" font-family="Arial, Helvetica, sans-serif">Enterprise AI Security &#183; Entra ID Modernization &#183; Azure</text>
</svg>`;

function iconSvg(size, fontSize) {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0078D4"/>
      <stop offset="100%" stop-color="#00BCD4"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="url(#ic)"/>
  <text x="50%" y="50%" dy="0.35em" font-size="${fontSize}" font-weight="800" fill="#ffffff" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" letter-spacing="-2">JM</text>
</svg>`;
}

async function generate() {
  const targets = [
    { name: "og-image.png", svg: ogSvg },
    { name: "icon.png", svg: iconSvg(512, 260) },
    { name: "apple-icon.png", svg: iconSvg(180, 92) },
  ];

  for (const t of targets) {
    const outPath = path.join(outputDir, t.name);
    await sharp(Buffer.from(t.svg)).png().toFile(outPath);
    console.log(`\u2705 Generated ${t.name}`);
  }
}

generate().catch((err) => {
  console.error("Failed to generate images:", err);
  process.exit(1);
});

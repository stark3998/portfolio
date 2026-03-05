#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Try to use canvas, fallback to SVG if not available
let Canvas;
try {
  Canvas = require("canvas");
} catch (e) {
  console.log(
    "canvas not installed, generating SVG-based OG image instead..."
  );
  generateSVGOGImage();
  process.exit(0);
}

// Generate OG image using canvas
const { createCanvas } = Canvas;
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Colors from portfolio theme
const colors = {
  azure: "#0078D4",
  teal: "#14b8a6",
  slate: "#1e293b",
  slate_light: "#f1f5f9",
};

// Background with gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, colors.azure);
gradient.addColorStop(1, colors.teal);
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add subtle pattern
ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
for (let i = 0; i < width; i += 50) {
  for (let j = 0; j < height; j += 50) {
    ctx.fillRect(i, j, 25, 25);
  }
}

// Main text
ctx.fillStyle = colors.slate_light;
ctx.font = "bold 72px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Jatin Madan", width / 2, height / 2 - 80);

// Subtitle
ctx.font = "32px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
ctx.fillStyle = "rgba(241, 245, 249, 0.85)";
ctx.fillText(
  "Cloud Architect | AI/ML Engineer | Security Specialist",
  width / 2,
  height / 2 + 40
);

// Decorative lines
ctx.strokeStyle = "rgba(241, 245, 249, 0.3)";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(200, height / 2 - 140);
ctx.lineTo(1000, height / 2 - 140);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(200, height / 2 + 100);
ctx.lineTo(1000, height / 2 + 100);
ctx.stroke();

// Output directory
const outputDir = path.join(__dirname, "../public");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save as PNG
const buffer = canvas.toBuffer("image/png");
const outputPath = path.join(outputDir, "og-image.png");
fs.writeFileSync(outputPath, buffer);
console.log(`✅ OG image generated: ${outputPath}`);

function generateSVGOGImage() {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0078D4;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#14b8a6;stop-opacity:1" />
      </linearGradient>
      <pattern id="pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="25" height="25" fill="white" opacity="0.05" />
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="url(#gradient)" />
    <rect width="1200" height="630" fill="url(#pattern)" />
    <line x1="200" y1="275" x2="1000" y2="275" stroke="rgba(241,245,249,0.3)" stroke-width="2" />
    <text x="600" y="270" font-size="72" font-weight="bold" text-anchor="middle" fill="rgb(241,245,249)" font-family="Arial, sans-serif">Jatin Madan</text>
    <text x="600" y="350" font-size="32" text-anchor="middle" fill="rgba(241,245,249,0.85)" font-family="Arial, sans-serif">Cloud Architect | AI/ML Engineer | Security Specialist</text>
    <line x1="200" y1="415" x2="1000" y2="415" stroke="rgba(241,245,249,0.3)" stroke-width="2" />
  </svg>`;

  const outputDir = path.join(__dirname, "../public");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "og-image.svg");
  fs.writeFileSync(outputPath, svg);
  console.log(`✅ OG image (SVG) generated: ${outputPath}`);
}

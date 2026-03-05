# Portfolio

A personal portfolio built with Next.js 16, TypeScript, Tailwind CSS, and MDX blog content.

## Overview

This project includes:
- A marketing-style homepage with sections for experience, projects, certifications, and research.
- An MDX-powered blog (`content/blog/*.mdx`) with static generation.
- Technical SEO foundations (metadata, sitemap, robots, RSS, structured data).
- Analytics instrumentation for user behavior and click tracking.
- Static export build output (`out/`) for GitHub Pages deployment.

## Features

- Next.js App Router (`src/app`)
- Static export configured in `next.config.ts`
- Dynamic blog routes via `src/app/blog/[slug]/page.tsx`
- RSS feed at `/blog/rss.xml`
- Sitemap at `/sitemap.xml` and robots at `/robots.txt`
- Open Graph/Twitter metadata + JSON-LD structured data
- Enhanced project section (filtering/sorting/modal)
- Blog interactivity (reading progress, table of contents, share buttons)

## Analytics

Analytics are initialized globally and tracked through reusable utilities:

- **Google Analytics 4 (GA4)**
- **Microsoft Clarity**
- **Vercel Analytics**

Key files:
- `src/components/AnalyticsProvider.tsx` – loads GA4 script and Vercel analytics.
- `src/lib/analytics.ts` – shared event helpers (CTA clicks, project views, social clicks, shares, filters, section views).
- `src/app/layout.tsx` – includes analytics provider and Clarity script bootstrapping.

### Example tracked events

- `cta_click`
- `project_view`
- `project_detail_view`
- `blog_read`
- `blog_shared`
- `social_click`
- `filter_used`
- `section_view`

### Troubleshooting Analytics

**Events not appearing in GA4 or Clarity?**

1. **Check environment variables**: Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_CLARITY_PROJECT_ID` are set in `.env.local` (local) or Vercel environment settings (production).

2. **Verify script loading**: Open browser DevTools → Network tab. Confirm requests to:
   - `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX` (GA4)
   - `https://www.clarity.ms/tag/` (Clarity)

3. **Test events in real-time**: In GA4, use **Realtime** report → Events. For Clarity, use **Recordings** → filter by session. Events may take 5–10 seconds to appear.

4. **Check browser console**: Look for errors in DevTools Console. Analytics scripts fail silently if blocked by ad blockers or privacy extensions.

5. **Disable ad blockers**: Extensions like uBlock Origin and Brave Shields block analytics. Test in Incognito mode or with extensions disabled.

6. **Verify event syntax**: Ensure `trackEvent()` calls in `src/lib/analytics.ts` use correct GA4 event naming (lowercase, underscores).

## Environment Variables

Create `.env.local` using `.env.local.example` as reference:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL used in metadata/sitemap/schema |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 Measurement ID (format: `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Optional | Microsoft Clarity project ID |

Notes:
- Variables are `NEXT_PUBLIC_*` and exposed client-side by design.
- If GA4/Clarity IDs are missing, related tracking gracefully degrades.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Other useful commands:

```bash
npm run lint
npm run build
```

## Build & Static Export

Production build:

```bash
npm run build
```

This project is configured with `output: "export"` and generates static files to `out/`.

## Deployment

Deployment is automated via GitHub Actions workflow:
- `.github/workflows/deploy.yml`

On push to `main`, the workflow:
1. Installs dependencies
2. Runs `npm run build`
3. Uploads `out/`
4. Deploys to GitHub Pages

## Content Authoring (Blog)

Blog posts live in `content/blog/*.mdx`.

Recommended frontmatter fields:

```md
---
title: "Post title"
date: "YYYY-MM-DD"
excerpt: "Short summary"
description: "SEO description"
author: "Jatin Madan"
tags: ["Tag1", "Tag2"]
keywords: ["keyword1", "keyword2"]
readingTime: 8
---
```

## Project Structure

```text
src/
  app/
  components/
  lib/
content/
  blog/
public/
```

## Configuration Files

- `next.config.ts` – Next.js static export configuration
- `.env.local.example` – required runtime configuration template
- `eslint.config.mjs` – lint configuration
- `tsconfig.json` – TypeScript configuration

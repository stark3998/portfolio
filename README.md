# Jatin Madan — Portfolio

Personal portfolio and blog built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Framer Motion**. Statically exported and deployed to **GitHub Pages**.

Production domain: **https://jatinmadan.com**

## Pages & Sections

### Homepage (`/`)
- **Hero** — Animated intro with particle background, floating security icons, and role titles (Engineering Manager 2 · Enterprise AI Program Architect, Enterprise AI Security & Identity Governance, 11x Microsoft Certified · 2x Claude Certified)
- **About** — Overview with stats (11 certifications, 7+ years experience, 5 research publications, CIS/MCSB/CISA frameworks) and four focus areas: Cloud Security Architecture, Identity Modernization, Data & Reporting, DevSecOps & Compliance
- **Tech Stack** — Categorized skill grid centered on identity platforms, security governance, cloud infrastructure, data/reporting, and DevSecOps automation
- **Experience** — Interactive timeline covering Deloitte, UC Irvine, ZS, IIT Bombay, Aam Aadmi Party, and HPCL-Mittal Energy roles
- **Projects** — Filterable/sortable project cards focused on identity modernization, hybrid access, security assessments, IAM automation, and remediation reporting
- **Certifications** — 11 Microsoft certifications displayed as badge cards (Expert, Associate, Specialty, Fundamentals) linked to Credly
- **Research & Publications** — 5 published papers across Springer, IEEE, and CRC Press covering cryptography, digital forensics, NLP, cloud computing, and IoT

### Blog (`/blog`)
- Dynamic blog powered by **Azure Cosmos DB**, merged with repo-hosted content
- Lists **everything** — written posts and interactive AI artifacts — with category filter chips
- Individual post pages with reading progress bar, table of contents sidebar, and share buttons
- RSS feed at `/blog/rss.xml`

### AI (`/ai`)
- AI section surfacing **AI-tagged posts and interactive HTML artifacts**
- Artifacts are self-contained HTML documents rendered in a full-screen sandboxed `<iframe>` viewer at `/ai/<slug>`
- Artifacts are **repo-hosted now** (`public/artifacts/*.html` registered in `content/artifacts.ts`) and can be **served from Cosmos DB later** with no code changes — both sources flow through the unified content layer (`src/lib/content.ts`)

### Contact (`/contact`)
- Social links (LinkedIn, GitHub, YouTube, X/Twitter) and email contact card

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript, React 19 |
| Styling | Tailwind CSS 4, Framer Motion |
| Blog Backend | Azure Cosmos DB |
| Analytics | Google Analytics 4, Microsoft Clarity, Vercel Analytics |
| Deployment | GitHub Actions → GitHub Pages |
| Particles | tsparticles |

## Project Structure

```
src/
  app/
    page.tsx              # Homepage (renders shared HomeSections)
    ai/
      page.tsx            # AI section listing (AI posts + artifacts)
      [slug]/page.tsx     # Artifact viewer (sandboxed iframe, SSG)
    blog/
      page.tsx            # Blog listing (all content, filterable)
      [slug]/page.tsx     # Blog post (SSG via generateStaticParams)
      rss.xml/route.ts    # RSS feed
    contact/page.tsx      # Contact page
    sitemap.ts            # Dynamic sitemap
    robots.ts             # Robots.txt
    layout.tsx            # Root layout with analytics
  components/
    HomeSections.tsx      # Shared homepage composition
    Hero.tsx              # Animated hero with particles
    About.tsx             # About section with stats
    TechStack.tsx         # Categorized skill grid
    Experience.tsx        # Timeline component
    Projects.tsx          # Filterable project grid
    ProjectCard.tsx       # Project card component
    ProjectModal.tsx      # Project detail modal
    Certifications.tsx    # Certification badge grid
    Research.tsx          # Publications list
    ContentCard.tsx       # Blog/AI content card
    ContentGrid.tsx       # Filterable content grid
    ArtifactViewer.tsx    # Full-screen sandboxed artifact iframe
    Navbar.tsx            # Navigation bar
    Footer.tsx            # Site footer
    ReadingProgress.tsx   # Blog reading progress bar
    TableOfContents.tsx   # Blog sidebar TOC
    ShareButtons.tsx      # Social share buttons
    ParticleBackground.tsx # tsparticles background
    AnalyticsProvider.tsx # GA4 + Vercel analytics
    SectionWrapper.tsx    # Reusable section container
  lib/
    content.ts            # Unified content layer (Cosmos + repo artifacts)
    blog.ts               # Cosmos DB blog queries
    cosmos.ts             # Cosmos DB client
    analytics.ts          # Shared event tracking helpers
    structuredData.ts     # JSON-LD schema generators
  hooks/
    useScrollTracking.ts  # Intersection observer for section tracking
content/
  artifacts.ts            # Repo-hosted AI artifact manifest
public/
  artifacts/              # Standalone HTML artifact files
  ...                     # Other static assets (images, og-image)
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `COSMOS_ENDPOINT` | Yes (build) | Azure Cosmos DB endpoint |
| `COSMOS_KEY` | Yes (build) | Azure Cosmos DB access key |
| `COSMOS_DATABASE` | Yes (build) | Cosmos DB database name |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL for metadata/sitemap |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 Measurement ID |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Optional | Microsoft Clarity project ID |

Server-side variables (`COSMOS_*`) are only used at build time and are **never** exposed to the browser. Only `NEXT_PUBLIC_*` variables are bundled client-side.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build & Deploy

```bash
npm run build   # Generates static site in out/
```

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`). On push to `master`:
1. Installs dependencies
2. Builds with Cosmos DB secrets and `NEXT_PUBLIC_SITE_URL=https://jatinmadan.com`
3. Uploads the `out/` directory
4. Deploys to GitHub Pages

## Adding an AI Artifact

Interactive artifacts are self-contained HTML documents shown in the AI section.

1. Drop a standalone HTML file into `public/artifacts/`, e.g. `public/artifacts/my-demo.html`.
2. Register it in `content/artifacts.ts`:

   ```ts
   {
     slug: "my-demo",
     title: "My Demo",
     excerpt: "Short description shown on the card.",
     publishedAt: "2026-03-01",
     tags: ["AI"],
     file: "my-demo.html",
   }
   ```

3. It automatically appears in `/ai` (and `/blog`), and opens at `/ai/my-demo` in the sandboxed viewer.

Later, the same content can be published from Azure Cosmos DB (set `type: "artifact"` on the document) instead of the repo — no code changes required.

## Analytics

Analytics are initialized globally via `AnalyticsProvider` and tracked through `src/lib/analytics.ts`:

- **Google Analytics 4 (GA4)**
- **Microsoft Clarity**
- **Vercel Analytics**

**Tracked events:** `cta_click`, `project_view`, `project_detail_view`, `blog_read`, `blog_shared`, `social_click`, `filter_used`, `section_view`

### Troubleshooting Analytics

1. **Check environment variables**: Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_CLARITY_PROJECT_ID` are set in `.env` (local) or GitHub Actions secrets (production).
2. **Verify script loading**: Open DevTools → Network tab. Confirm requests to `googletagmanager.com` (GA4) and `clarity.ms` (Clarity).
3. **Test events in real-time**: GA4 Realtime report → Events. Clarity Recordings → filter by session.
4. **Disable ad blockers**: Extensions like uBlock Origin block analytics. Test in Incognito mode.

## SEO

- **Open Graph + Twitter Card** metadata on all pages, with a real **PNG social image** (`public/og-image.png`, 1200×630) generated at build time via `scripts/generate-og-image.js` (uses `sharp`). PNG is used instead of SVG because most social platforms don't render SVG previews.
- **JSON-LD structured data:**
  - `Person` + `WebSite` on all pages
  - `BlogPosting` + `BreadcrumbList` on blog posts
  - `CreativeWork` + `BreadcrumbList` on AI artifacts
  - `CollectionPage` + `ItemList` + `BreadcrumbList` on the AI section
- **PWA web manifest** (`/manifest.webmanifest`) with icons and theme color for mobile SEO.
- **Favicon + Apple touch icon** as real PNGs (`public/icon.png`, `public/apple-icon.png`) wired via metadata `icons`.
- **Dynamic sitemap** covering static pages, blog posts (Cosmos), and AI artifacts.
- **RSS feed** including all content (posts + artifacts) with categories.
- Canonical URLs, per-page keywords, and `robots.txt`.

Branding images are regenerated automatically on every build via the `prebuild` npm script. Run `npm run generate-images` to regenerate them manually.

## Configuration Files

- `next.config.ts` — Static export configuration for GitHub Pages custom-domain deployment
- `eslint.config.mjs` — ESLint configuration
- `tsconfig.json` — TypeScript configuration
- `scripts/generate-og-image.js` — Generates `og-image.png`, `icon.png`, and `apple-icon.png` (runs on `prebuild`)

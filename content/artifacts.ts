/**
 * Repo-hosted interactive HTML artifacts.
 *
 * Each entry points to a standalone HTML file in `public/artifacts/<file>`.
 * These are surfaced in the AI section (and the main Blog) and rendered in a
 * sandboxed full-screen iframe viewer. Add a new artifact by dropping an HTML
 * file into `public/artifacts/` and registering it here.
 *
 * Later, the same items can be served from Azure Cosmos DB instead — the
 * unified content layer (`src/lib/content.ts`) merges both sources, so no code
 * changes are needed to switch a piece from repo-hosted to Cosmos-hosted.
 */
export interface ArtifactManifestEntry {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  tags: string[];
  /** File name inside `public/artifacts/`. */
  file: string;
}

export const artifacts: ArtifactManifestEntry[] = [
  {
    slug: "frontier-threat-defense-program-strategy",
    title: "Frontier Threat Defense — Program Strategy",
    excerpt:
      "A full operating model for defending an enterprise against adversaries that attack at machine speed with AI — scope, controls, ownership, and measurement for a Frontier Threat Defense program.",
    publishedAt: "2026-09-16",
    tags: ["AI", "Security", "Threat Defense", "Strategy", "Governance"],
    file: "frontier-threat-defense-program-strategy.html",
  },
  {
    slug: "frontier-threat-defense-kill-chain",
    title: "Frontier Threat Defense — The AI Attack Kill Chain",
    excerpt:
      "A stage-by-stage anatomy of a real frontier-AI agent intrusion — roughly 700 autonomous agents, no human operator, two and a half days — mapped as a kill chain, with the control that breaks it at each stage.",
    publishedAt: "2026-09-15",
    tags: ["AI", "Security", "Threat Defense", "Frontier AI", "Kill Chain"],
    file: "frontier-threat-defense-kill-chain.html",
  },
  {
    slug: "entra-migration-dashboard",
    title: "Okta → Entra Migration Dashboard",
    excerpt:
      "An interactive dashboard concept visualizing an Okta-to-Entra application migration wave — status, risk, and cutover readiness across app instances.",
    publishedAt: "2026-02-01",
    tags: ["AI", "Identity", "Entra", "Dashboard"],
    file: "entra-migration-dashboard.html",
  },
];

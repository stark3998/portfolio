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
    slug: "entra-migration-dashboard",
    title: "Okta → Entra Migration Dashboard",
    excerpt:
      "An interactive dashboard concept visualizing an Okta-to-Entra application migration wave — status, risk, and cutover readiness across app instances.",
    publishedAt: "2026-02-01",
    tags: ["AI", "Identity", "Entra", "Dashboard"],
    file: "entra-migration-dashboard.html",
  },
];

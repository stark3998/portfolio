const GITHUB_USERNAME = "stark3998";
const GITHUB_API = "https://api.github.com";

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  readme: string | null;
}

interface GitHubApiRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
}

const headers: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

async function fetchReadmeMarkdown(repoName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      {
        headers,
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.content && data.encoding === "base64") {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      console.warn(`GitHub API responded with ${res.status}`);
      return [];
    }

    const repos: GitHubApiRepo[] = await res.json();

    const filtered = repos.filter(
      (r) => !r.fork && !r.archived && r.name !== GITHUB_USERNAME
    );

    // Fetch READMEs sequentially to avoid hitting rate limits
    const results: GitHubRepo[] = [];
    for (const repo of filtered) {
      const readme = await fetchReadmeMarkdown(repo.name);
      results.push({
        name: repo.name,
        description: repo.description || "",
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        readme,
      });
    }

    return results;
  } catch (error) {
    console.warn("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  C: "#555555",
  Swift: "#F05138",
  Shell: "#89e051",
  CSS: "#563d7c",
  HTML: "#e34c26",
  "Jupyter Notebook": "#DA5B0B",
};

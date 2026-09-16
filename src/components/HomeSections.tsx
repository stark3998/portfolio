import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import FrontierThreatDefense from "@/components/FrontierThreatDefense";
import GitHubProjects from "@/components/GitHubProjects";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Research from "@/components/Research";
import { fetchGitHubRepos } from "@/lib/github";

/**
 * Shared homepage composition, reused by `/` and any other route that
 * needs the full landing page. Kept as a separate component so the page
 * modules stay thin.
 */
export default async function HomeSections() {
  const githubRepos = await fetchGitHubRepos();

  return (
    <>
      <Hero />
      <About />
      <Education />
      <TechStack />
      <Experience />
      <Projects />
      <FrontierThreatDefense />
      <GitHubProjects repos={githubRepos} />
      <Certifications />
      <Research />
    </>
  );
}

import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GitHubProjects from "@/components/GitHubProjects";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Research from "@/components/Research";
import { fetchGitHubRepos } from "@/lib/github";

export default async function Home() {
  const githubRepos = await fetchGitHubRepos();

  return (
    <>
      <Hero />
      <About />
      <Education />
      <TechStack />
      <Experience />
      <Projects />
      <GitHubProjects repos={githubRepos} />
      <Certifications />
      <Research />
    </>
  );
}

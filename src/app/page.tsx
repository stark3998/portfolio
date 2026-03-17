import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Research from "@/components/Research";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <TechStack />
      <Experience />
      <Projects />
      <Certifications />
      <Research />
    </>
  );
}
